package ff;

import java.io.IOException;
import java.util.List;

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

@SuppressWarnings("serial")
public class ShowItem extends HttpServlet {

	DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();

	public void doGet(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		doPost(req, resp);
	}

	public void doPost(HttpServletRequest req, HttpServletResponse resp)
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
				item = datastore.get(key);
				images = datastore.prepare(imageQuery)
                        .asList(FetchOptions.Builder.withDefaults());
			} catch (EntityNotFoundException e) {
				e.printStackTrace();
			}
		}

		req.setAttribute("item", item);
		req.setAttribute("images", images);
		req.getRequestDispatcher("/item.jsp").forward(req, resp);
	}
}
