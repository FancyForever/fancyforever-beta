<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
{"output":
	[
	<c:forEach items="${items}" var="item" varStatus="loop">
		{
            "id":"<c:out value="${item.key.id}" />",
            "name":"<c:out value="${item.properties.name}" />",
            "primaryImg":"<c:out value="${item.properties.primaryImg}" />",
            "brand":"<c:out value="${item.properties.brand}" />",
            "gender":"<c:out value="${item.properties.gender}" />",
            "category":"<c:out value="${item.properties.category}" />",
            "sub_category":"<c:out value="${item.properties.sub_category}" />",
            "fabric":"<c:out value="${item.properties.fabric}" />",
            "fitting":"<c:out value="${item.properties.fitting}" />",
            "washtype":"<c:out value="${item.properties.washtype}" />",
            "description":"<c:out value="${item.properties.description}" />"
		}<c:if test="${!loop.last}">,</c:if>
    </c:forEach>
    ]
}