<%
Option Explicit
Response.Expires = -1000

Dim oConn
Dim oRS
Dim sSQL
Dim sColor

Response.Write("<font size=2 face=arial>")
Response.Write("Brinkster Example #1<br>")
Response.Write("Database Select Example Using Microsoft's Northwind Sample Database<br><br>")

Set oConn = Server.CreateObject("ADODB.Connection")
oConn.Open("Provider=Microsoft.Jet.OLEDB.4.0; Data Source=" & Server.MapPath("\tigger2031\db\BrinksterExampleDatabase.mdb"))

sSQL = "SELECT ProductName, QuantityPerUnit, UnitPrice, UnitsInStock FROM Products"
Set oRS = oConn.Execute(sSQL)

	Response.Write("<table border=1 cellpadding=1 cellspacing=1 style='font-family:arial; font-size:10pt;'>")
	Response.Write("<tr bgcolor=black style='color:white;'><td>Product Name</td>")
	Response.Write("<td>Quantity Per Unit</td>")
	Response.Write("<td align=right>Price</td>")
	Response.Write("<td>In Stock</td></tr>")

sColor = "white"

Do While NOT oRS.EOF 

	If sColor = "silver" Then
		sColor = "white"
	Else
		sColor = "silver"
	End If
   
	Response.Write("<tr bgcolor='" & sColor & "'>")
	Response.Write("<td>" & oRS("ProductName").Value & "</td>")
	Response.Write("<td>" & oRS("QuantityPerUnit").Value & "</td>")
	Response.Write("<td align=right>$" & oRS("UnitPrice").Value & "</td>")
	Response.Write("<td align=right>" & oRS("UnitsInStock").Value & "</td></tr>")
	
	oRS.MoveNext

Loop

	Response.Write("</table><br><br>")

oConn.Close
Set oRS = Nothing
Set oConn = Nothing

%>
