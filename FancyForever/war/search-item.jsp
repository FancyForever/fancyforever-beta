<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<html>
	<head>
		<title>Search Item and Add Stock</title>
		<link type="text/css" rel="stylesheet" href="/css/page.css" media="all" />
		<script type="text/javascript" src="/js/lib/jquery-1.11.0.min.js"></script>
		<style>
			th {
				text-align:left;
			}
			.search-result td {
				vertical-align:top;
				border-bottom: 1px solid lightgray;
			}
			.bdr-btm {
				vertical-align:top;
				border-bottom: 1px solid lightgray;
			}
			.mandatory {
				color: red;
			}
			.ta-center {
				text-align:center;
			}
		</style>
	</head>
	<body>
		<div id="search-panel">
			<form id="search-item-form" method="post" action="/search-item">
			<table style="width:960px; margin: 0 auto;">
				<colgroup>
					<col width="9%"></col>
					<col width="25%"></col>
					<col width="13%"></col>
					<col width="25%"></col>
					<col width="10%"></col>
					<col width="20%"></col>
				</colgroup>
				<tr><td colspan="6" class="ta-center bdr-btm"><h3>Search Item</h3></td></tr>
				<tr>
					<td class="bold"><label class="float-l">Item<label></td><td><input type="text" id="item" name="item" style="width:100%"></td>
					<td class="bold"><label class="float-r">Name<label></td><td><input type="text" id="name" name="name" style="width:100%"></td>
					<td class="bold"><label class="float-r">Gender<label></td><td><input type="text" id="gender" name="gender" style="width:100%"></td>
				</tr>
				<tr>
					<td class="bold"><label class="float-l">Category</label></td><td><input type="text" id="category" name="category" style="width:100%"></td>
					<td class="bold"><label class="float-r">Sub-Category</label></td><td><input type="text" id="sub_category" name="sub_category" style="width:100%"></td>
					<td class="bold"><label class="float-r">Brand<label></td><td><input type="text" id="brand" name="brand" style="width:100%"></td>
				</tr>
				<tr>
					<td class="bold"><label class="float-l">Fabric</label></td><td><input type="text" id="fabric" name="fabric" style="width:100%" value="<%=request.getAttribute("fabric")%>"></td>
					<td class="bold"><label class="float-r">Fitting</label></td><td><input type="text" id="fitting" name="fitting" style="width:100%"></td>
					<td class="bold"><label class="float-r">Wash Type<label></td><td><input type="text" id="washtype" name="washtype" style="width:100%"></td>
				</tr>
				<tr>
					<td class="bdr-btm bold">In Stock</td><td class="bdr-btm"><input type="checkbox" id="in_stock" style="margin-left:0;"></td>
					<td class="bdr-btm bold"><label class="float-r">All Items</label></td><td class="bdr-btm"><input type="checkbox" id="all_items" style="margin-left:0;"></td>
					<td colspan="2" class="bdr-btm">
						<input type="button" name="search" id="search" value="Search" class="float-r" onclick="callOnClickSearch();" />
					</td>
				</tr>
			</table>
			</form>
		</div>
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
				<c:forEach items="${items}" var="item">
	                <tr>
	                    <td><a href="/item?id=<c:out value="${item.key.id}" />"><c:out value="${item.properties.name}" /></a></td>
	                    <td><img src='<c:out value="${item.properties.primaryImage}" />=s50'/></td>
	                    <td><c:out value="${item.properties.brand}" /></td>
	                    <td><c:out value="${item.properties.gender}" /></td>
	                    <td><c:out value="${item.properties.category}" /></td>
	                    <td><c:out value="${item.properties.sub_category}" /></td>
	                    <td><c:out value="${item.properties.fabric}" /></td>
	                    <td><c:out value="${item.properties.fitting}" /></td>
	                    <td><c:out value="${item.properties.washtype}" /></td>
	                    <td><c:out value="${item.properties.description}" /></td>
	                </tr>
	            </c:forEach>
	        </table>
		</div>
		<script>
			function callOnClickSearch() {
				document.getElementById('search-item-form').submit();
				/*$.post("/search-item", function( data ) {
					  $("#search-result" ).html( data );
				});*/
			}
		</script>
	</body>
</html>