package ff.web.action;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.appengine.api.users.UserService;
import com.google.appengine.api.users.UserServiceFactory;

public class LoginAction extends HttpServlet {

	private static final long serialVersionUID = 1L;

	UserService userService = UserServiceFactory.getUserService();

	public void doGet(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {

		String thisURL = req.getParameter("curURL");
		System.out.println(thisURL);
		String thisURL1 = req.getRequestURI();
		System.out.println(thisURL1);
		String loginURL = userService.createLoginURL(thisURL);

		req.getRequestDispatcher(loginURL).forward(req, resp);
	}

	public void doPost(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		doGet(req, resp);
	}
}
