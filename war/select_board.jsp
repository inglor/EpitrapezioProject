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
<link rel="stylesheet" type="text/css" href="gadget/main.css" />
</head>
<body>
	<p>Select background image, or upload a new one</p>
	<form method="post" action="/epitrapezio">
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
</table>
</form>
<br>
<form
	action="<%= blobstoreService.createUploadUrl("/upload_bkg_img") %>"
	method="post" enctype="multipart/form-data"><input type="file"
	name="bkg_image"> <input type="submit" value="Submit">
</form>
</body>
