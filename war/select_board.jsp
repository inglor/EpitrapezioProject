<!DOCTYPE html>
<%@ page import="com.google.appengine.api.blobstore.BlobstoreServiceFactory"%>
<%@ page import="com.google.appengine.api.blobstore.BlobstoreService"%>
<%@ page import="com.google.appengine.api.datastore.DatastoreService"%>
<%@ page import="com.google.appengine.api.datastore.DatastoreServiceFactory"%>
<%@ page import="com.google.appengine.api.datastore.Entity"%>
<%@ page import="com.google.appengine.api.datastore.PreparedQuery"%>
<%@ page import="com.google.appengine.api.datastore.Query"%>
<%@ page import="com.google.appengine.api.blobstore.BlobKey"%>
<%@ page import="eu.spyropoulos.epitrapezio.Board"%>

<%
	//DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
	//Query q = new Query("Board");
	//PreparedQuery pq = datastore.prepare(q);
	
	//EntityManager em = EMF.get().createEntityManager();
    //try {
    //    em.persist(this);
    //} finally {
    //    em.close();
    //}

    BlobstoreService blobstoreService = BlobstoreServiceFactory.getBlobstoreService();
%>

<html>
<head>
<title>Epitrapezio App Engine v 1.0</title>
<link rel="stylesheet" type="text/css" href="/gadget/main.css" />
<script type="text/javascript">
	function checkEmpty() {
		var formOK = true;
		if(document.getElementById("image_name").value == "" || document.bkg_image.selected == null) {
			formOK = false;
		}

		if(formOK == false) alert("Please Select or upload an image.");
		return formOK;
	}

	function toggleUpload() {
		var upload_div = document.getElementById("upload_div")
		if (document.getElementById("radio_other").checked) {
			upload_div.style.display = "block";
		} else {
			upload_div.style.display = "none";
			document.getElementById("image_name").value = "";
			document.getElementById("image_browse").value = "";
		}
	}
</script>
</head>
<body>
	<p>Select background image, or upload a new one</p>
	<table>
		<tr>
			</th>Thumbnail</th><th>Name</th>
		</tr>
	<%
	for (Board result : Board.getAll()) {//pq.asIterable()) {
	    String key = result.getImage().getKeyString();
	    String name = result.getName();
	%>
	<tr>
		<td>...</td>
		<td><a href="/epitrapezio?bkg_image<%= key %>"><%= name %></a></td>
	</tr>
	<%
	}
	%>
	<!-- <tr>
		<td><input type="radio" id="radio_other" name="bkg_image" value="upload" onChange="toggleUpload();"></td>
		<td>...</td>
		<td>Upload</td>
	</tr>
	-->
</table>
<br>
<form name="form1" action="<%= blobstoreService.createUploadUrl("/upload_bkg_img") %>" method="post" enctype="multipart/form-data" onSubmit="return checkEmpty();">
	<div id="upload_div" style="display:block;">
		Name: <input type="text" name="image_name" id="image_name">
		<br/>Location:<input type="file" name="bkg_image_browse" id="image_browse">
	</div>
	<br/>
	<input type="submit" value="Submit">
</form>
</body>
