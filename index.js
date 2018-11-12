// JavaScript File
"use strict";

window.onload = function(){
            
            let searchOne = document.getElementById("searchOne");
            let showAll = document.getElementById("showAll");
            let httpRequest;
        
            searchOne.addEventListener("click", makeRequest);
            showAll.addEventListener("click", makeRequestAll);
                
            function makeRequest(){
                let searchWord = document.querySelector("input").value;
                httpRequest = new XMLHttpRequest();
                httpRequest.onreadystatechange = request;
                httpRequest.open('GET', "/request.php?q=" + searchWord + "&all = false", true);
                httpRequest.send();
            }
            
            function request(){
                if (httpRequest.readyState === XMLHttpRequest.DONE){
                    if (httpRequest.status === 200){
                        document.getElementById('result').innerHTML = httpRequest.responseText;
                    } else {
                        alert('There was a problem with the request.');
                    }
                }
            }
            
            function makeRequestAll(){
                httpRequest = new XMLHttpRequest();
                httpRequest.onreadystatechange = requestAll;
                httpRequest.open('GET', "/request.php?q=&all=true", true);
                httpRequest.send();
            }
            
             function requestAll(){
                if (httpRequest.readyState === XMLHttpRequest.DONE){
                    if (httpRequest.status === 200){
                        let xmlData = httpRequest.responseXML;
                        let list = document.createElement("ol");
                        let parent = document.getElementById("result");
                        document.getElementById('result').innerHTML = "";
                        parent.appendChild(list);
                        let xmlNodes = xmlData.getElementsByTagName("definition");
        
                        for(let i = 0; i < xmlNodes.length; i++){
                            let listItem = document.createElement("li");
                            let txt = "<h3>" + xmlNodes[i].getAttribute("name") + "</h3>" + 
                            "<br>" + "<p>" + xmlNodes[i].childNodes[0].nodeValue + "</p>" +
                            "<br>" + "<p>" + "- " + xmlNodes[i].getAttribute("author") + "</p>";
                            listItem.innerHTML = txt;
                            list.appendChild(listItem);
                        }
                    }else {
                        alert('There was a problem with the request.');
                    }
                }
            }
};