package ff;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.EntityNotFoundException;
import com.google.appengine.api.datastore.Key;
import com.google.appengine.api.datastore.KeyFactory;

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
		
		Long id = Long.parseLong(req.getParameter("id"));
		if(id != null) {
			Key key = KeyFactory.createKey("item", id);
			try {
				item = datastore.get(key);
			} catch (EntityNotFoundException e) {
				e.printStackTrace();
			}
		}

		req.setAttribute("item", item);
		req.getRequestDispatcher("/item.jsp").forward(req, resp);
	}
}
