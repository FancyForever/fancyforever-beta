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
import com.google.appengine.api.datastore.EntityNotFoundException;
import com.google.appengine.api.datastore.FetchOptions;
import com.google.appengine.api.datastore.Key;
import com.google.appengine.api.datastore.KeyFactory;
import com.google.appengine.api.datastore.PreparedQuery;
import com.google.appengine.api.datastore.Query;
import com.google.appengine.api.datastore.Query.CompositeFilterOperator;
import com.google.appengine.api.datastore.Query.Filter;
import com.google.appengine.api.datastore.Query.FilterOperator;
import com.google.appengine.api.datastore.Query.FilterPredicate;

public class SearchItem extends HttpServlet {

	DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();

	public void doGet(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		doPost(req, resp);
	}

	public void doPost(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {

		String output 		= req.getParameter("output");
		String all_items 	= req.getParameter("all_items");
		String in_stock 	= req.getParameter("in_stock");
/*
		@SuppressWarnings("unchecked")
		Map<String, String[]> params = req.getParameterMap();

		List<Filter> filters = new ArrayList<Filter>();
		for (String key : params.keySet()) {
			String[] val = params.get(key);
			if (val[0] != null && val[0].trim() != "") {
				List<String> list = convertCSVToList(val[0].trim());
				Filter filter = new FilterPredicate(key, FilterOperator.IN,
						list);
				req.setAttribute(key, val[0]);
				filters.add(filter);
			}
		}

*/		Query query = new Query("item");
/*
		if (filters.size() > 1) {
			Filter filter = CompositeFilterOperator.and(filters);

			query.setFilter(filter);
		} else if(filters.size() > 0 )
			query.setFilter(filters.get(0));

*/		PreparedQuery pq = datastore.prepare(query);

		List<Entity> items = new ArrayList<Entity>();
		List<Entity> images = null;
		for (Entity item : pq.asIterable()) {
			System.out.println(item.getProperties().get("name"));
			System.out.println(item.getKey().getId());
			items.add(item);
			Key key = KeyFactory.createKey("item", item.getKey().getId());
			Query imageQuery = new Query("image").setAncestor(key);  
			images = datastore.prepare(imageQuery)
			        .asList(FetchOptions.Builder.withDefaults());
			for(Entity image : images)
			{
				String strPrimary = image.getProperty("primary").toString();
				System.out.println("Primary - " + strPrimary);
				int primary = Integer.parseInt(strPrimary);
				if(primary == 1) {
					item.setProperty("primaryImg", image.getProperty("url"));
					System.out.println(image.getProperty("url"));
				}
			}
			System.out.println(images.size());
	}

		req.setAttribute("items", items);
		req.setAttribute("images", images);
		if(output != null && output.equals("json"))
			req.getRequestDispatcher("/item-json.jsp").forward(req, resp);
		else
			req.getRequestDispatcher("/search-item.jsp").forward(req, resp);
	}

	private List<String> convertCSVToList(String val) {

		if (val == null)
			return null;
		String[] arr = val.split(",");
		List<String> list = new ArrayList<String>();
		for (String s : arr) {
			list.add(s.trim());
		}
		return list;
	}
}
