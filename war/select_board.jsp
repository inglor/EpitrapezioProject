<!DOCTYPE html>
<%@ page import="com.google.appengine.api.blobstore.BlobstoreServiceFactory"%>
<%@ page import="com.google.appengine.api.blobstore.BlobstoreService"%>
<%@ page import="com.google.appengine.api.datastore.DatastoreService"%>
<%@ page import="com.google.appengine.api.datastore.DatastoreServiceFactory"%>
<%@ page import="com.google.appengine.api.datastore.Entity"%>
<%@ page import="com.google.appengine.api.datastore.PreparedQuery"%>
<%@ page import="com.google.appengine.api.datastore.Query"%>

<%
	DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
	Query q = new Query("Board");
	PreparedQuery pq = datastore.prepare(q);

    BlobstoreService blobstoreService = BlobstoreServiceFactory.getBlobstoreService();
%>

<html>
<head>
<title>Epitrapezio App Engine v 1.0</title>
<link rel="stylesheet" type="text/css" href="/gadget/main.css" />
<script type="text/javascript">
	function checkEmpty() {
		var formOK = true;

		if(document.getElementById("image_name").value == "" || document.bkg_image.selected == null) formOK = false;

		if(formOK == false) alert("Please Select or upload an image.");
		return formOK;
	}

	function enableUpload() {
		document.getElementById("upload_div").style.display ="block";
	}
</script>
</head>
<body>
	<form name="form1" action="<%= blobstoreService.createUploadUrl("/upload_bkg_img") %>" method="post" enctype="multipart/form-data" onSubmit="return checkEmpty();">
	<p>Select background image, or upload a new one</p>
	<table>
		<th>
			<td></td></td>Thumbnail</td><td>Name</td>
		</th>
	<%
	for (Entity result : pq.asIterable()) {
	    String key = (String) result.getProperty("key");
	    String name = (String) result.getProperty("name");
	%>
	<tr>
		<td><input type="radio" name="bkg_image" value="<%= key %>"></td>
		<td>...</td>
		<td><%= name %></td>
	</tr>
	<%
	}
	%>
	<tr>
		<td><input type="radio" name="bkg_image" value="upload" onChange="enableUpload();"></td>
		<td>...</td>
		<td>Upload</td>
	</tr>
</table>
<br>
	<div id="upload_div" style="display:none;">
		Name: <input type="text" name="image_name" id="image_name">
		<br/>Location:<input type="file" name="bkg_image_browse" id="image_browse">
	</div>
	<br/>
	<input type="submit" value="Submit">
</form>
</body>
