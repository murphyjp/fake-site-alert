// Add a tag to all anchor text which leads to a watch listed site.

// A regular expression which matches any links that are suspect.
// There are three parts to this regex, the first matches
// http://<beginning of domain name> or https://<beginning of domain name>
// The second is a giant "or" section which matches the main domain and any
// subdirectories that are needed.
// The third is a single / to end the domain page.
var fake_list_regex = /https?:\/\/([^\/]*\.)?(100percentfedup\.com|21stcenturywire\.com|70news\.wordpress\.com|abcnews\.com\.co|activistpost\.com|addictinginfo\.org|americannewsx\.com|americannews\.com|associatedmediacoverage\.com|beforeitsnews\.com|beingliberal\.org|bigamericannews\.com|bigpzone\.com|www\.bizpacreview\.com|bluenationreview\.com|www\.breitbartt\.co|civictribune\.com|coasttocoastam\.com|collectiveevolution|consciouslifenews\.com|conservativeoutfitters\.com|countdowntozerotime\.com|counterpsyops\.com|creambmp\.com|dailybuzzlive\.com|dailycurrant\.com|dailywire\.com|dcclothesline\.com|dcgazette\.com|denverguardian\.com|derfmagazine\.com|disclose\.tv|drudgereport\.com\.co|duhprogressive\.com|embols\.com|empireherald\.com|empirenews\.com|endingthefed\.com|enduringvision\.com|fprnradio\.com|thefreethoughtproject\.com|geoengineeringwatch\.org|govtslaves\.info|gulagbound\.com|hangthebankers\.com|humansarefree\.com|ifyouonlynews\.com|infowars\.com|intellihub\.com|inquisitor\.com|jonesreport\.com|lewrockwell\.com|liberalamerica\.org|libertytalk\.fm|libertyunyielding\.com|libertyvideos\.org|mediamass\.net|megynkelly\.us|msnbc\.com\.co|msnbc\.website|nationalreport\.net|naturalnews\.com|nbc-news\.net|ncscooper\.com|newcenturytimes\.com|newsexaminer\.net|news-hound\.com|newsbiscuit\.com|newsbuzzdaily\.com|newswatch28\.com|opposingviews\.com|newswire-24\.com|now8news\.com|nowtheendbegins\.com|occupydemocrats\.com|www\.pakalertpress\.com|politicalblindspot\.com|politicalears\.com|politicalo\.com|politicususa\.com|prisonplanet\.com|private-eye\.co\.uk|projectveritas\.com|react365\.com|realfarmacy\.com|redflagnews\.com|redstate\.com|www\.reporter\.bz|rilenews\.com|rushlimbaugh\.com|theblaze\.com|thefreethoughtproject\.com|other98\.com|thebostontribune\.com|www\.thedailysheeple\.com|www\.thenewsnerd\.com|therundownlive\.com|www\.thestatelyharold\.com|theuspatriot\.com|truthfrequencyradio\.com|twitchy\.com|unconfirmedsources\.com|usasupreme\.com|blastingnews\.com|usuncut\.com|www\.veteranstoday\.com|wakingupwisconsin\.com|wideawakeamerica\.com|winningdemocrats\.com|witscience\.org|www\.wnd\.com|worldtruth\.tv|zerohedge\.com)\//;

var parody_list_regex = /https?:\/\/([^\/]*\.)?(cap-news\.com|christwire\.org|chronicle\.su|clickhole\.com|duffleblog\.com|huzlers\.com|nahadaily\.com|newslo\.com|newsmutiny\.com|newyorker\.com\/humor\/borowitz-report|realnewsrightnow\.com|reductress\.com|satiratribune\.com|theonion\.com|worldnewsdailyreport\.com)\//;

// A function to clean up all links in the page.
var TagLinks = function() {
  var links = document.getElementsByTagName("a");
  // Loop over all links in the page.
  for (var i=0; i < links.length; ++i) {
    // See if the link matches our watch list.
    if (links[i].href.match(fake_list_regex)) {
      if (links[i].lastChild != null && links[i].lastChild.class == "fake-news-tag" ) {
        // This link has already been processed.
        continue;
      }
      // Add a Misleading banner to the dom.
      var striped_lines_box = document.createElement('div');
      striped_lines_box.style.cssText = "background-image: url(https://i.imgur.com/m5Wjo7h.png); height:20px; width: 100%;padding:0 10px;text-align:center;";

      var inner_text = document.createElement('span');
      inner_text.textContent = "Possibly Misleading Content";
      inner_text.style.cssText = "font-family: 'Lucida Console', Monaco, monospace; color: white; margin: auto; background: black; display: inline-block; height:100%; width: auto; text-align: center; font-size: 12px;padding:0 4px;";

      striped_lines_box.appendChild(inner_text);
      // Go up 3 parents so that the tag is more visible in a reasonable place.
      // This is very specific to Facebook's current dom layout.
      links[i].parentElement.parentElement.parentElement.appendChild(striped_lines_box);

      // Add an element as the last child which serves to make sure we only
      // process this link once.
      var hidden = document.createElement('span');
      hidden.textContent = "";
      hidden.style.cssText = "display: none";
      hidden.class = "fake-news-tag";
      links[i].appendChild(hidden);
    }
	if (links[i].href.match(parody_list_regex)) {
      if (links[i].lastChild != null && links[i].lastChild.class == "parody-news-tag" ) {
        // This link has already been processed.
        continue;
      }
      // Add a Misleading banner to the dom.
      var striped_lines_box = document.createElement('div');
      striped_lines_box.style.cssText = "background-image: url(https://i.imgur.com/GKiUyzN.png); height:20px; width: 100%;padding:0 10px;text-align:center;";

      var inner_text = document.createElement('span');
      inner_text.textContent = "Satirical Content";
      inner_text.style.cssText = "font-family: 'Lucida Console', Monaco, monospace; color: white; margin: auto; background: black; display: inline-block; height:100%; width: auto; text-align: center; font-size: 12px;padding:0 4px;";

      striped_lines_box.appendChild(inner_text);
      // Go up 3 parents so that the tag is more visible in a reasonable place.
      // This is very specific to Facebook's current dom layout.
      links[i].parentElement.parentElement.parentElement.appendChild(striped_lines_box);

      // Add an element as the last child which serves to make sure we only
      // process this link once.
      var hidden = document.createElement('span');
      hidden.textContent = "";
      hidden.style.cssText = "display: none";
      hidden.class = "parody-news-tag";
      links[i].appendChild(hidden);
    }
  }
}

// Process the page once a second.
setInterval(TagLinks, 1000);
