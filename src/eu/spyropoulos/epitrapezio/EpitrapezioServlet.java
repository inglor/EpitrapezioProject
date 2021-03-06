package eu.spyropoulos.epitrapezio;

import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.logging.Logger;


import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.users.UserService;
import com.google.appengine.api.users.UserServiceFactory;

@SuppressWarnings("serial")
public class EpitrapezioServlet extends HttpServlet {
    private static final Logger log = Logger.getLogger(EpitrapezioServlet.class.getName());

	public void doGet(HttpServletRequest req, HttpServletResponse resp) throws IOException { 
		final UserService userService = UserServiceFactory.getUserService();
		final URI uriWithOptionalGameParam;
		String gameKey = req.getParameter("g");
		if (userService.getCurrentUser() == null) {
			String thisURL = req.getRequestURL().toString();
			resp.getWriter().println("<p>Please <a href=\"" +
					userService.createLoginURL(getGameUriWithGameParam(req, gameKey)) + "\">sign in</a>.</p>");
			return;
		}
		
		String bkgImage = req.getParameter("bkg_image");
		log.info("img = " + bkgImage);
		if (bkgImage == null) {
		    resp.sendRedirect("/select_board.jsp");
		} else {
		    resp.sendRedirect("/edit_board.jsp?bkg_image="+bkgImage);
		}
		
		/*

	    PersistenceManager pm = PMF.get().getPersistenceManager();

	    Game game = null;
	    String userId = userService.getCurrentUser().getUserId();
	    if (gameKey != null) {
	      game = pm.getObjectById(Game.class, KeyFactory.stringToKey(gameKey));
	      if (game.getUserO() == null && !userId.equals(game.getUserX())) {
	        game.setUserO(userId);
	      }
	    } else {
	      game = new Game(userId, null, "         ", true);
	      pm.makePersistent(game);
	      gameKey = KeyFactory.keyToString(game.getKey());
	    }
	    pm.close();

	    ChannelService channelService = ChannelServiceFactory.getChannelService();
	    String token = channelService.createChannel(game.getChannelKey(userId));

	    FileReader reader = new FileReader("index-template");
	    CharBuffer buffer = CharBuffer.allocate(16384);
	    reader.read(buffer);
	    String index = new String(buffer.array());
	    index = index.replaceAll("\\{\\{ game_key \\}\\}", gameKey);
	    index = index.replaceAll("\\{\\{ me \\}\\}", userId);
	    index = index.replaceAll("\\{\\{ token \\}\\}", token);
	    index = index.replaceAll("\\{\\{ initial_message \\}\\}", game.getMessageString());
	    index = index.replaceAll("\\{\\{ game_link \\}\\}", getGameUriWithGameParam(req, gameKey));

	    resp.setContentType("text/html");
	    resp.getWriter().write(index);*/
	}



	private String getGameUriWithGameParam(HttpServletRequest req,
			String gameKey) throws IOException {    
		try {
			String query;
			if (gameKey == null) {
				query = "";
			} else {
				query = "g=" + gameKey;
			}
			URI thisUri = new URI(req.getRequestURL().toString());
			URI uriWithOptionalGameParam = new URI(thisUri.getScheme(),
					thisUri.getUserInfo(),
					thisUri.getHost(),
					thisUri.getPort(),
					thisUri.getPath(),
					query,
					"");
			return uriWithOptionalGameParam.toString();
		} catch (URISyntaxException e) {
			throw new IOException(e.getMessage());
		}

	}
}


