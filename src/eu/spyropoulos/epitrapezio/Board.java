package eu.spyropoulos.epitrapezio;

import com.google.appengine.api.blobstore.BlobKey;
import com.google.appengine.api.datastore.Key;

import java.util.List;

import javax.persistence.Basic;
import javax.persistence.Entity;
import javax.persistence.EntityManager;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Query;

@Entity
public class Board {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Key key;
    private String name;
    @Basic
    private BlobKey image;
    
    public Key getKey() {
        return key;
    }
    
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    
    public BlobKey getImage() {
        return image;
    }
    public void setImage(BlobKey image) {
        this.image = image;
    }
    
    public void save() {
        EntityManager em = EMF.get().createEntityManager();
        try {
            em.persist(this);
        } finally {
            em.close();
        }
    }
    
    public static List<Board> getAll() {
        EntityManager em = EMF.get().createEntityManager();
        try {
            Query q = em.createQuery("select from " + Board.class.getName());
            return q.getResultList();
        } finally {
            em.close();
        }
    }
    
}
