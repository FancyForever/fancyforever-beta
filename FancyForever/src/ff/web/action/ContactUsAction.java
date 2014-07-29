package ff.web.action;

import java.io.IOException;

import javax.mail.MessagingException;
import javax.mail.internet.AddressException;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import ff.mail.ContactUs;

public class ContactUsAction extends HttpServlet {

	private static final long serialVersionUID = 1L;

	public void doGet(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		doPost(req, resp);
	}

	public void doPost(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {

		String name = req.getParameter("name");
		String mobile = req.getParameter("mobile");
		String email = req.getParameter("email");
		String category = req.getParameter("category");
		String subject = req.getParameter("subject");
		String message = req.getParameter("message");

		System.out.println(name + " " + mobile + " " + email + " " + category + " " + subject + " " + message);
		
		//TODO: Validate Input
		
		try {
			ContactUs.sendMail(name, mobile, email, category, subject, message);
		} catch (AddressException e) {
			 e.printStackTrace();
			throw new IOException("Failed to send Email");
		} catch (MessagingException e) {
			e.printStackTrace();
			throw new IOException("Failed to send Email");
		}
	}
}
