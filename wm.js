function get_upc() {
  // Example input (from clipboard < Android WM App):
  //Extra Spearmint Sugarfree Gum, 35-stick pack
  //
  //http://www.walmart.com/ip/Extra-Spearmint-Sugarfree-Gum-35-stick-pack/139941034
  
  var name_url = document.getElementsByName('search_input')[0].value;
  var url_start = name_url.indexOf("http");
  // If we found 'http'
  if (url_start != -1) {
    // URL is from 'http' to the end
    var url = name_url.slice(url_start);
    var split_url = url.split('/');
    // Item ID is the last bit
    var item_id = split_url[split_url.length - 1];
    // Item name is from beginning to 'http' (-2 spaces)
    var item_name = name_url.slice(0, url_start - 2);
  } else { // Didn't have a url in the input; assume we were given an item ID
    var item_id = name_url;
  }
 
  var api_key = 'YOUR WALMART API KEY HERE';
  
  var query = 'https://api.walmartlabs.com/v1/items/' + item_id + '?apiKey=' + api_key + '&format=json&callback=process_request';
  
  var script = document.createElement('script');
  script.setAttribute('src', query);
  // Add to head and execute
  document.getElementsByTagName('head')[0].appendChild(script);
  
}

function process_request(r) {
  // var response = JSON.parse(r);
  var upc = r['upc'];
  // Make barcode
  if (upc) {

    // Create element for barcode
    canvas = document.createElement('canvas');
    canvas.setAttribute('id', 'barcode');

    // Create a title
    p = document.createElement('p');
    p.innerText = r['name']

    // Make a div to contain them
    div = document.createElement('div');
    div.appendChild(canvas);
	div.appendChild(p);

    // Add to the document
    document.getElementsByTagName('body')[0].appendChild(div);

    // Generate barcode
    JsBarcode("#barcode", upc, { format: "UPC" });
    
  } else {
    window.alert("Didn't find UPC");
  }

  }
  
  function clear_search_text() {
    document.getElementsByName('search_input')[0].value = "";
  }
