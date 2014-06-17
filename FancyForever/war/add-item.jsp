<%@ page import="com.google.appengine.api.blobstore.BlobstoreServiceFactory" %>
<%@ page import="com.google.appengine.api.blobstore.BlobstoreService" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<%
    BlobstoreService blobstoreService = BlobstoreServiceFactory.getBlobstoreService();
%>

<html>
	<head>
		<link type="text/css" rel="stylesheet" href="/css/page.css" media="all" />
		<link type="text/css" rel="stylesheet" href="/css/colorbox.css" media="all" />
		<script src="/js/util/util.js?v=1.0"></script>
		<script src="/js/lib/jquery-1.8.3.js?v=1.0"></script>
		<script src="/js/lib/colorbox.js?v=1.0"></script>
		<title>Add Item</title>
		<style>
			td {
				vertical-align:top;
				border-bottom: 1px solid lightgray;
			}
			.mandatory {
				color: red;
			}
			SPAN.link {
				color: #1785CD;
				font-size: small;
				border: none;
				cursor:pointer;
			}

		</style>
	</head>
	<body>
		<form id="add-item-form" action="<%= blobstoreService.createUploadUrl("/add-item") %>" method="post" enctype="multipart/form-data">
			<table style="width:960px; margin: 0 auto">
				<colgroup>
					<col width="20%"></col>
					<col width="80%"></col>
				</colgroup>
				<tr><td colspan="2" style="text-align:center;"><h1>Add Item</h1></td></tr>
				<tr>
					<td class="bold">Name<span class="mandatory">*</span></td>
					<td>
					    <input type="text" style="width:70%" name="name" id="name" value="${item.properties.name}" />
					</td>
				</tr>
				<tr>
					<td class="bold">Gender<span class="mandatory">*</span></td>
					<td>
					    <select style="width:70%" name="gender" id="gender">
					    	<option>Boy</option>
					    	<option selected>Girl</option>
					    	<option>Unisex</option>
					    </select>
					    <span class="float-r">
					    	<span class="dialog_box link" id="editGender" title="Edit Gender">Edit</span> | 
					    	<span class="dialog_box link" id="addGender" title="Add Gender">Add</span> Gender
					    </span> 
					</td>
				</tr>
				<tr>
					<td class="bold">Category<span class="mandatory">*</span></td>
					<td>
					    <select style="width:70%" name="category" id="category">
					    	<option>Ethnic</option>
					    	<option selected>Western</option>
					    	<option>Accessory</option>
					    </select>
					    <span class="float-r">
					    	<span class="dialog_box link" id="editCategory" title="Edit Category">Edit</span> | 
					    	<span class="dialog_box link" id="addCategory" title="Add Category">Add</span> Category
					    </span> 
					</td>
				</tr>
				<tr>
					<td class="bold">Sub Category<span class="mandatory">*</span></td>
					<td>
					    <select style="width:70%" name="sub_category" id="sub_category">
					    	<option>Dress</option>
					    	<option>Sherwani</option>
					    	<option>Kurta Pyjama</option>
					    	<option>Dhoti Kurta</option>
					    </select>
					    <span class="float-r">
					    	<span class="dialog_box link" id="editSubCategory" title="Edit Sub-Category">Edit</span> | 
					    	<span class="dialog_box link" id="addSubCategory" title="Add Sub-Category">Add</span> Sub-Category
					    </span> 
					</td>
				</tr>
				<tr>
					<td class="bold">Brand<span class="mandatory">*</span></td>
					<td>
					    <select style="width:70%" name="brand" id="brand">
					    	<option>GiniJhony</option>
					    	<option>Lillyput</option>
					    	<option>Mebaz</option>
					    	<option>Other</option>
					    </select>
					    <span class="float-r">
					    	<span class="dialog_box link" id="editBrand" title="Edit Brand">Edit</span> | 
					    	<span class="dialog_box link" id="addBrand" title="Add Brand">Add</span> Brand
					    </span> 
					</td>
				</tr>
				<tr>
					<td class="bold">Fabric</td>
					<td>
					    <select style="width:70%" name="fabric" id="fabric">
					    	<option>NA</option>
					    	<option>Satin</option>
					    	<option>Silk</option>
					    	<option>Raw Silk</option>
					    	<option>Cotton</option>
					    	<option>Polyester</option>
					    	<option>Jeans</option>
					    	<option>Strechable</option>
					    </select>
					    <span class="float-r">
					    	<span class="dialog_box link" id="editFabric" title="Edit Fabric">Edit</span> | 
					    	<span class="dialog_box link" id="addFabric" title="Add Fabric">Add</span> Fabric
					    </span> 
					</td>
				</tr>
				<tr>
					<td class="bold">Fitting</td>
					<td>
					    <select style="width:70%" name="fitting" id="fitting">
					    	<option>NA</option>
					    	<option>Normal</option>
					    	<option>Slim</option>
					    	<option>Freesize</option>
					    	<option>Low waist</option>
					    </select>
					    <span class="float-r">
					    	<span class="dialog_box link" id="editFitting" title="Edit Fitting">Edit</span> | 
					    	<span class="dialog_box link" id="addFitting" title="Add Fitting">Add</span> Fitting
					    </span> 
					</td>
				</tr>
				<tr>
					<td class="bold">Washtype</td>
					<td>
					    <select style="width:70%" name="washtype" id="washtype">
					    	<option>NA</option>
					    	<option selected>Dryclean</option>
					    	<option>Cool Water</option>
					    	<option>Normal</option>
					    	<option>Do not Iron</option>
					    </select>
					    <span class="float-r">
					    	<span class="dialog_box link" id="editWashtype" title="Edit Washtype">Edit</span> | 
					    	<span class="dialog_box link" id="addWashtype" title="Add Washtype">Add</span> Washtype
					    </span> 
					</td>
				</tr>
				<tr>
					<td class="bold">Image<span class="mandatory">*</span></td>
					<td>
			            <table class="tc-tbl-no-bdr" width="100%" cellspacing="0" cellpadding="0">
			                <tr>
			                    <td style="border:none">
			                    	<input type="hidden" name="primaryImageFlag" id="primaryImageFlag" value="0" />
			                        <div id="imageRow" style="display:none" class="sm-ft float-l">
			                            <input type="hidden" name="imageRowCounter" id="imageRowCounter" value="0" />
			                            <input type="file" id="primaryImage" name="primaryImage">
										<input type="radio" name="primaryImage" id="primaryImage" value="primaryImage"> Is Primary?
			                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
										<input type="image" id="deleteImageRow" 
			                                                name="deleteImageRow" 
			                                                src="/images/delete.gif"
			                                                style="width:15px;padding-top:5px;"
			                                                class="aln-mdl" 
			                                                title="Delete Row" 
			                                                alt="Delete Row" 
			                                                onclick="deleteRow(event, 'primaryImage', true); return false;" />
			                        </div>
			                    <td>
			                </tr>
			                <tr>
			                    <td style="border:none">
			                        <span class="link float-l top-pad-10 ltf-pad-5" onclick="javascript:insertRow('imageRow');" title="Add Image">[Add More Image]</span>
			                    </td>
			                </tr>
			            </table>
					</td>
				</tr>
				<tr>
					<td class="bold">Description</td>
					<td>
					    <textarea name="description" id="description" rows="3" style="width:100%;"></textarea>
					</td>
				</tr>
				<tr rowspan="2">
					<td colspan="2" style="text-align:center;">
					    <input type="button" value="Add Item" id="add-item" onclick="callOnClickAdd();" />
					</td>
				</tr>
			</table>
		    
		</form>
		<script>
			$( document ).ready(function() {
				insertRow('imageRow');
				if ("${item.properties}" != "") {
					$("#gender").val("${item.properties.gender}");
					$("#category").val("${item.properties.category}");
					$("#sub_category").val("${item.properties.sub_category}");
					$("#brand").val("${item.properties.brand}");
					$("#fabric").val("${item.properties.fabric}");
					$("#fitting").val("${item.properties.fitting}");
					$("#washtype").val("${item.properties.washtype}");
					$("#description").val("${item.properties.description}");
					$("#primaryImage").hide();
					for(var i=1; i < "${item.properties.image_count}"; i++) {
						$( "#images" ).append( "<img src='<c:out value="${item.properties.moreImage1}" />=s50'/>");
					}
				}
			});
			
		    $(".dialog_box").click(function() {
		        var href = "/wip.jsp?orgName=" + $("#entry_agent").val();
		        $(".dialog_box").colorbox({iframe:true, innerWidth:"460px", innerHeight:"400px", overlayClose:false, href:href});
		    });
		        
			function callOnClickAdd() {
				reset();
				var error = validate();
				if(error == 0) {
					document.getElementById('add-item-form').submit();
				}
			}
			
			function validate() {
				var error = 0;
				var name = trim(document.getElementById('name').value);
				if(name == "") {
					error = 1;
					document.getElementById('name').style.border = "1px solid red";
				}
				if(getValueForMultipleRows('imageRowCounter', 'moreImage', 'image') == -1)
		        {
		            error = 1;
		        }
				// Primary Image
				var primaryFound = 0;
				var elements = document.getElementsByName('primaryImage');
				for(var i=0; i<=elements.length; i++) {
					if(elements[i] && elements[i].checked)
					{
						primaryFound = 1;
						$("#primaryImageFlag").val(elements[i].value);
						break;
					}
				}
				if (!error && !primaryFound) {
					alert('Select Primary Image');
					error = 1;
				}
				return error;
			}
			
			function trim(str) {
				return str.replace(/^\s+|\s+$/g,'')
			}
			
			function reset() {
				document.getElementById('name').style.border = "";
		        var counter = $('#imageRowCounter').val();
		        for(var i = 1; i <= counter; i++)
		        {
		        	$('#moreImage' + i).css({'border' : 'none'});
		        }
		    }
		</script>
	</body>
</html>