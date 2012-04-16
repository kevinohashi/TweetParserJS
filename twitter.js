$(document).ready(function() {
	/* Twitter Guidelines
	 1. Author Name - link to twitter.com/username (Not included)
	 2. @mentions - link to twitter.com/username (Included)
	 3. #Hashtags - link to http://twitter.com/search?q=%23keyword (Included)
	 4. URLs - link to URL (Included)
	 5. Branding - display logo/twitter next to tweet (Not included)
	 6. Tweet Box - (Not included)
	 7. Images - (Not included)
	*/

	//define your div name here that holds the tweets
	$(".tweet").each(function(i){
		//process each piece of data
		$(this).html(parseTweets($(this).html()));

	});


});

function parseTweets(message){
	message = parseUrls(message);
	message = parseMentions(message);
	message = parseHashtags(message);
	return message;
}

function parseUrls(message){
	var linkedMessage = "";
	var parsedAllUrls = false;
	while(parsedAllUrls == false){
		var urlStart = message.search(/http:\/\//i);//find url
		if(urlStart == -1){//no urls left, finish up
			linkedMessage = linkedMessage + message;
			parsedAllUrls = true;
		}else{//parse the url
			linkedMessage = linkedMessage + message.substr(0,urlStart);//put info until link into final message
			message = message.substr(urlStart);//change message to whats left up to url
			var endUrl = message.search(/ /i);//get end of url
			if(endUrl == -1){//in case nothing after url
				endUrl = message.length;
			}
			linkedMessage = linkedMessage + htmlLinkUrl(message.substr(0,endUrl));
			message = message.substr(endUrl);
		}

	}

	return linkedMessage;
}
function htmlLinkUrl(url){
	var htmlLink = "<a href=\"" + url + "\">" + url + "</a>";
	return htmlLink;
}
function parseMentions(message){
	message = " " + message;
	var linkedMessage = "";
	var parsedAllMentions = false;
	while(parsedAllMentions == false){
		var mentionStart = message.search(/[^a-zA-Z0-9]@([a-zA-Z0-9_]+([\s]|$))/gm);
		if(mentionStart == -1){//no mentions left, finish up
			linkedMessage = linkedMessage + message;
			parsedAllMentions = true;
		}else{//parse the mention
			linkedMessage = linkedMessage + message.substr(0,mentionStart+1);//put info until link into final message
			message = message.substr(mentionStart+1);//change message to whats left up to mention	
			var endMention = message.search(/ /i);//get end of mention
			if(endMention == -1){//in case nothing after mention
				endMention = message.length;
			}
			linkedMessage = linkedMessage + htmlLinkMention(message.substr(0,endMention));
			message = message.substr(endMention);
		}
	}
	return linkedMessage;
}

function htmlLinkMention(mention){
	var htmlLink = "<a href=\"http://twitter.com/" + mention.substr(1) + "\">" + mention + "</a>";
	return htmlLink;
}

function parseHashtags(message){
	message = " " + message;
	var linkedMessage = "";
	var parsedAllHashtags = false;
	while(parsedAllHashtags == false){
		var hashtagsStart = message.search(/[^a-zA-Z0-9]#([a-zA-Z0-9_]+([\s]|$))/gm);
		if(hashtagsStart == -1){//no hashtags left, finish up
			linkedMessage = linkedMessage + message;
			parsedAllHashtags = true;
		}else{//parse the hashtag
			linkedMessage = linkedMessage + message.substr(0,hashtagsStart+1);//put info until link into final message
			message = message.substr(hashtagsStart+1);//change message to whats left up to hashtag
			var endHashtags = message.search(/ /i);//get end of hashtag
			if(endHashtags == -1){//in case nothing after hashtag
				endHashtags = message.length;
			}
			linkedMessage = linkedMessage + htmlLinkHashtags(message.substr(0,endHashtags));
			message = message.substr(endHashtags);
		}
	}
	return linkedMessage;
}

function htmlLinkHashtags(hashtag){
	var htmlLink = "<a href=\"http://twitter.com/search?q=%23" + hashtag.substr(1) + "\">" + hashtag + "</a>";
	return htmlLink;
}

