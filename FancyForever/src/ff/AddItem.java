package ff;

import java.io.IOException;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.EntityNotFoundException;
import com.google.appengine.api.datastore.FetchOptions;
import com.google.appengine.api.datastore.Key;
import com.google.appengine.api.datastore.KeyFactory;
import com.google.appengine.api.datastore.Query;
import com.google.appengine.api.images.ImagesService;
import com.google.appengine.api.images.ImagesServiceFactory;
import com.google.appengine.api.images.ServingUrlOptions;
import com.google.appengine.api.blobstore.BlobKey;
import com.google.appengine.api.blobstore.BlobstoreService;
import com.google.appengine.api.blobstore.BlobstoreServiceFactory;

@SuppressWarnings("serial")
public class AddItem extends HttpServlet {

	private DatastoreService datastoreService = DatastoreServiceFactory
			.getDatastoreService();

	private BlobstoreService blobstoreService = BlobstoreServiceFactory
			.getBlobstoreService();

	private ImagesService imagesService = ImagesServiceFactory
			.getImagesService();

	public void doGet(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		
		Entity item = null;
		List<Entity> images = null;
		
		String sId = req.getParameter("id");
		Long id = null;
		if (sId != null)
			id = Long.parseLong(req.getParameter("id"));
		if(id != null) {
			Key key = KeyFactory.createKey("item", id);
			Query imageQuery = new Query("image").setAncestor(key);  
			try {
				item = datastoreService.get(key);
				images = datastoreService.prepare(imageQuery)
                        .asList(FetchOptions.Builder.withDefaults());
			} catch (EntityNotFoundException e) {
				e.printStackTrace();
			}
		}

		req.setAttribute("item", item);
		req.setAttribute("images", images);
		req.getRequestDispatcher("/add-item.jsp").forward(req, resp);
	}
	
	public void doPost(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {

/*		System.out.println("Param");
		Enumeration<?> params = req.getParameterNames();
		while (params.hasMoreElements()) {
			String ele = (String) params.nextElement();
			System.out.println(ele + " " + req.getParameter(ele));
		}
*/		
		Map<String, String> images = new HashMap<String, String>();
		Map<String, List<BlobKey>> blobs = blobstoreService.getUploads(req);
		for(String key : blobs.keySet()) {
			//System.out.println(key);
			List<BlobKey> list = blobs.get(key);
			if (list != null) {
				BlobKey blobKey = list.get(0);

				ServingUrlOptions options = ServingUrlOptions.Builder
						.withBlobKey(blobKey);

				try {
					images.put(key, imagesService.getServingUrl(options));
				} catch (Exception e) {
					
				}
			}
		}

		String primaryImageFlag = req.getParameter("primaryImageFlag").trim();
		System.out.println(primaryImageFlag);
		Entity item = new Entity("item");
		String name = req.getParameter("name").trim();
		item.setProperty("name", name);
		String gender = req.getParameter("gender").trim();
		item.setProperty("gender", gender); // boy, girl, unisex
		String cat = req.getParameter("category").trim();
		item.setProperty("category", cat); // western, ethnic, accessory
		String sub_cat = req.getParameter("sub_category").trim();
		item.setProperty("sub_category", sub_cat);
		String brand = req.getParameter("brand").trim();
		item.setProperty("brand", brand);
		String fabric = req.getParameter("fabric").trim();
		item.setProperty("fabric", fabric); // satin, raw_silk, cotton, silk,
												// jeans, strechable, polyester
		String fitting = req.getParameter("fitting").trim();
		item.setProperty("fitting", fitting); // slim, normal, low_waist,
												// free_size
		String washtype = req.getParameter("washtype").trim();
		item.setProperty("washtype", washtype); // dryclean, cool_water
		String description = req.getParameter("description").trim();
		item.setProperty("description", description);
		
		item.setProperty("image_count", images.keySet().size());
		
		Key key = datastoreService.put(item);
		
		int count = 0;
		for(String k : images.keySet()) {
			Entity image = new Entity("image", key);
			System.out.println(k);
			int primary = k.equalsIgnoreCase(primaryImageFlag) ? 1 : 0;
			System.out.println(primary);
			image.setProperty("primary", primary);
			image.setProperty("url", images.get(k));
			image.setProperty("imgCount", count++);
			datastoreService.put(image);
		}

		resp.sendRedirect("/item?id="+key.getId());
		
		/*Entity stock = new Entity("stock");
		stock.setProperty("item", key);
		stock.setProperty("age_start", "2");
		stock.setProperty("age_end", "3");
		stock.setProperty("color", "black");
		stock.setProperty("size", "large");
		stock.setProperty("quantity", "4");
		stock.setProperty("mrp", "4500");
		stock.setProperty("vendor", "");
		stock.setProperty("cost_price", "3700");

		datastoreService.put(stock);*/
	}
}
