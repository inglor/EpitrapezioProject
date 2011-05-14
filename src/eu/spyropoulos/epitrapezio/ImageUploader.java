package eu.spyropoulos.epitrapezio;

import com.google.appengine.api.blobstore.BlobKey;
import com.google.appengine.api.blobstore.BlobstoreService;
import com.google.appengine.api.blobstore.BlobstoreServiceFactory;

import java.io.IOException;
import java.util.Map;

import javax.persistence.EntityManager;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class ImageUploader extends HttpServlet {
    private BlobstoreService blobstoreService = BlobstoreServiceFactory.getBlobstoreService();
    
    public void doPost(HttpServletRequest req, HttpServletResponse res)
    throws ServletException, IOException {
        
        Map<String, BlobKey> blobs = blobstoreService.getUploadedBlobs(req);
        BlobKey blobKey = blobs.get("bkg_image");
        
        if (blobKey == null) {
            res.sendRedirect("/epitrapezio");
        } else {
            Board board = new Board();
            board.setImage(blobKey);
            board.setName(blobKey.getKeyString());
            board.save();
            res.sendRedirect("/epitrapezio?bkg_image=" + board.getImage());
        }
    }
}
