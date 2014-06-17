<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page import="com.google.appengine.api.datastore.Entity" %>
<%@ page import="java.util.List" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<html>
	<head>
		<script src="/js/lib/jquery-1.8.3.js?v=1.0"></script>
		<script src="/js/lib/jquery.elevatezoom.js" type="text/javascript"></script>
		<style>
			.zoom-wrapper {
				border-radius: 10px;
				border: 1px solid #E0E0E0;
				padding: 10px;
			}

			.zoom-left {
				float: left;
				width: 412px;
			}
			
			.zoom0left img {
				border:1px solid #e8e8e6;
				padding: 2px;
			}
			
			a {
				color: #1982d1;
				text-decoration: none;
			}
			
			#gallery_09 img {
				border: 2px solid white;
				width: 96px;
			}
			h1 {
				color: #333333;
				font-size: 36px;
				line-height: 40px;
				font-family: "Happy Monkey", "Helvetica Neue", Arial, Helvetica, Geneva, sans-serif;
				font-style: normal;
				font-weight: normal;
				text-align: center;
			}

		</style>
	</head>
	<body>
		<div id="search-result">
			<table class="search-result" style="width:960px; margin: 0 auto;">
	            <tr>
	                <th>Name</th>
	                <th>Image</th>
	                <th>Brand</th>
	                <th>Gender</th>
	                <th>Category</th>
	                <th>Sub-Category</th>
	                <th>Fabric</th>
	                <th>Fitting</th>
	                <th>Washtype</th>
	                <th>Description</th>
	            </tr>
	                <tr>
	                    <td><a href="/item?id=<c:out value="${item.key.id}" />"><c:out value="${item.properties.name}" /></a></td>
	                    <td><img src='<c:out value="${images[0].properties.url}" />=s50'/></td>
	                    <td><c:out value="${item.properties.brand}" /></td>
	                    <td><c:out value="${item.properties.gender}" /></td>
	                    <td><c:out value="${item.properties.category}" /></td>
	                    <td><c:out value="${item.properties.sub_category}" /></td>
	                    <td><c:out value="${item.properties.fabric}" /></td>
	                    <td><c:out value="${item.properties.fitting}" /></td>
	                    <td><c:out value="${item.properties.washtype}" /></td>
	                    <td><c:out value="${item.properties.description}" /></td>
	                </tr>
	        </table>
		</div>

		<div class="zoom-wrapper" style="width:960px; margin: 0 auto;">
			<div class="zoom-left">
				<img style="border:1px solid #e8e8e6;" id="zoom_09" src="<c:out value="${images[0].properties.url}" />" data-zoom-image="<c:out value="${item.properties.primaryImage}" />" width="411">
		
				<div id="gallery_09">
				 
					<%
						List<Entity> images = (List<Entity>) request.getAttribute("images");
						for (Entity image : images) {
							pageContext.setAttribute("url", image.getProperty("url"));
					%>
			
							<a href="#" class="elevatezoom-gallery active" data-update="" data-image="${url}" data-zoom-image="${url}">
								<img src="${url}=s100"  width="90">
							</a>
					<% 
						} 
					%>
				</div>
			</div>

			<div class="zoom-right">
				<h1>${item.properties.name}</h1>
			</div>
			<div style="clear:both;"></div>
		</div>
				
		<script>
				$("#zoom_09").elevateZoom({
		            gallery : "gallery_09",
		            galleryActiveClass: "active",
		            lensSize: 100,
		            scrollZoom : true
				}); 
		</script>
	</body>
</html>