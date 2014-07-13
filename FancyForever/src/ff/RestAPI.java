package ff;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.FetchOptions;
import com.google.appengine.api.datastore.Key;
import com.google.appengine.api.datastore.KeyFactory;
import com.google.appengine.api.datastore.PreparedQuery;
import com.google.appengine.api.datastore.Query;
import com.google.gson.Gson;

public class RestAPI extends HttpServlet {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();

	public void doGet(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		
		doPost(req, resp);
	}

	public void doPost(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {

		//String param_all 		= req.getParameter("all");
		//String param_age 	= req.getParameter("by_age");
		//String param_in_stock 	= req.getParameter("in_stock");

		Query query = new Query("item");
		PreparedQuery pq = datastore.prepare(query);

		@SuppressWarnings("rawtypes")
		List<Map> raw_items = new ArrayList<Map>();
		List<Entity> items = new ArrayList<Entity>();
		List<Entity> images = null;
		for (Entity item : pq.asIterable()) {
			items.add(item);
			Key key = KeyFactory.createKey("item", item.getKey().getId());
			Query imageQuery = new Query("image").setAncestor(key);  
			images = datastore.prepare(imageQuery)
			        .asList(FetchOptions.Builder.withDefaults());
			for(Entity image : images)
			{
				String strPrimary = image.getProperty("primary").toString();
				int primary = Integer.parseInt(strPrimary);
				if(primary == 1) {
					item.setProperty("primaryImg", image.getProperty("url"));
					System.out.println(image.getProperty("url"));
				}
			}
			raw_items.add(item.getProperties());
	}

		req.setAttribute("items", items);
		req.setAttribute("images", images);
		Gson gson = new Gson();
		String json = gson.toJson(raw_items);
		System.out.println(json);

		resp.setContentType("application/json");				
		resp.getWriter().write(json);

		//req.getRequestDispatcher("/_items/all").forward(req, resp);
	}
}
