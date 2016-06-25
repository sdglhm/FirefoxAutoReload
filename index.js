var contextMenu = require("sdk/context-menu");
var tabs = require("sdk/tabs");
var self = require("sdk/self");
var {setInterval, clearInterval} = require('sdk/timers')

var reloadIsOn = false;
var current;

var menuItem = contextMenu.Menu({
	label: "Auto-Reload",
	context: contextMenu.URLContext("*.fiverr.com/*"),
	contentScript: "self.on('click', function(node, data) {self.postMessage(data, node.id);});",
	image: self.data.url("refresh-icon.png"),
	items: [
	contextMenu.Item({
		label: "Reload every 3 minutes", 
		data: "reload3m",

	}),
	contextMenu.Item({ 
		label: "Reload every 5 minutes",
		data: "reload5m" 
	}),
	contextMenu.Separator({

	}),
	contextMenu.Item({ 
		label: "Stop Reload", 
		data: "reloadstop",
		image: self.data.url("stop.png")
	})
	],
	
	onMessage: function(data, tabs) {
		console.log(data);
		var tabs = require("sdk/tabs");
		var tabId = tabs.activeTab;
		
		if (data == "reload3m") {
			current = setInterval(function(data){
				tabId.reload();
				console.log("Reloaded for 3 minutes");
			},180000);
		}else if (data == "reload5m"){
			current = setInterval(function(data){
				tabId.reload();
			},300000);
			console.log("Reloaded for 5 minutes");
		}else if (data == "reloadstop"){
			console.log("Reloaded ended");
			clearInterval(current);
		}
	}
});

