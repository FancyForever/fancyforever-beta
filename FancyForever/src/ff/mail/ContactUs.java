package ff.mail;

import java.io.UnsupportedEncodingException;
import java.util.Properties;

import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.AddressException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

public class ContactUs {

	public static final String FROM_EMAIL = "mrrohit.maheshwari@gmail.com";
	public static final String FROM_PERSONAL = "FF Contact Us";

	public static final String TO_EMAIL = "mrrohit.maheshwari@gmail.com";
	public static final String TO_PERSONAL = "FF Admin";

	public static final String SUBJECT = "FF Contact-US Mail";

	public static void sendMail(String name, String mobile, String email,
			String category, String subject, String msgBody)
			throws AddressException, MessagingException,
			UnsupportedEncodingException {

		Properties props = new Properties();
		Session session = Session.getDefaultInstance(props, null);

		Message msg = new MimeMessage(session);

		msg.setFrom(new InternetAddress(FROM_EMAIL, FROM_PERSONAL));

		msg.addRecipient(Message.RecipientType.TO, new InternetAddress(
				TO_EMAIL, TO_PERSONAL));

		msg.setSubject(SUBJECT + " [" + name + "][" + mobile + "][" + email + "]["+ category + "]");

		StringBuilder sb = new StringBuilder();
		sb.append("Name: ").append(name).append("\n");
		sb.append("Mobile: ").append(mobile).append("\n");
		sb.append("Email: ").append(email).append("\n");
		sb.append("Category: ").append(category).append("\n");
		sb.append("Subject: ").append(subject).append("\n");
		sb.append("Message: ").append("\n");
		sb.append(msgBody).append("\n");
		msg.setText(sb.toString());
		Transport.send(msg);
	}
}
