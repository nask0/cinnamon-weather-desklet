/**
 * Importing API objects
 */
const Gio = imports.gi.Gio;
const St = imports.gi.St;
const Desklet = imports.ui.desklet;
const Lang = imports.lang;
const Mainloop = imports.mainloop;
const Clutter = imports.gi.Clutter;
const GLib = imports.gi.GLib;
const Tweener = imports.ui.tweener;
const Util = imports.misc.util;
const Main = imports.ui.main;

const Tooltips = imports.ui.tooltips;
const PopupMenu = imports.ui.popupMenu;
const Cinnamon = imports.gi.Cinnamon;
const Settings = imports.ui.settings;
const Soup = imports.gi.Soup;

const STYLE_POPUP_SEPARATOR_MENU_ITEM = 'popup-separator-menu-item';

const _httpSession = new Soup.SessionAsync();

var cc;
var counter = 0;
var zoomCalcs = [];

//~ imports.paths.push('/home/nask0/.local/share/cinnamon/desklets/weather-desklet@nask0');
//~ const xmldoc = imports.xmldoc;

if(typeof JKL=="undefined")JKL=function(){};JKL.ParseXML=function(e,t,n){this.http=new JKL.ParseXML.HTTP(e,t,n,false);return this};JKL.ParseXML.VERSION="0.22";JKL.ParseXML.MIME_TYPE_XML="text/xml";JKL.ParseXML.MAP_NODETYPE=["","ELEMENT_NODE","ATTRIBUTE_NODE","TEXT_NODE","CDATA_SECTION_NODE","ENTITY_REFERENCE_NODE","ENTITY_NODE","PROCESSING_INSTRUCTION_NODE","COMMENT_NODE","DOCUMENT_NODE","DOCUMENT_TYPE_NODE","DOCUMENT_FRAGMENT_NODE","NOTATION_NODE"];JKL.ParseXML.prototype.async=function(e,t){this.callback_func=e;this.callback_arg=t};JKL.ParseXML.prototype.onerror=function(e,t){this.onerror_func=e};JKL.ParseXML.prototype.parse=function(){if(!this.http)return;if(this.onerror_func){this.http.onerror(this.onerror_func)}if(this.callback_func){var e=this;var t=function(){if(!e.http)return;var t=e.parseResponse();e.callback_func(t,e.callback_arg)};this.http.async(t)}this.http.load();if(!this.callback_func){var n=this.parseResponse();return n}};JKL.ParseXML.prototype.setOutputArrayAll=function(){this.setOutputArray(true)};JKL.ParseXML.prototype.setOutputArrayAuto=function(){this.setOutputArray(null)};JKL.ParseXML.prototype.setOutputArrayNever=function(){this.setOutputArray(false)};JKL.ParseXML.prototype.setOutputArrayElements=function(e){this.setOutputArray(e)};JKL.ParseXML.prototype.setOutputArray=function(e){if(typeof e=="string"){e=[e]}if(e&&typeof e=="object"){if(e.length<0){e=false}else{var t={};for(var n=0;n<e.length;n++){t[e[n]]=true}e=t;if(e["*"]){e=true}}}this.usearray=e};JKL.ParseXML.prototype.parseResponse=function(){var e=this.http.documentElement();var t=this.parseDocument(e);return t};JKL.ParseXML.prototype.parseDocument=function(e){if(!e)return;var t=this.parseElement(e);if(this.usearray==true){t=[t]}else if(this.usearray==false){}else if(this.usearray==null){}else if(this.usearray[e.nodeName]){t=[t]}var n={};n[e.nodeName]=t;return n};JKL.ParseXML.prototype.parseElement=function(e){if(e.nodeType==7){return}if(e.nodeType==3||e.nodeType==4){var t=e.nodeValue.match(/[^\x00-\x20]/);if(t==null)return;return e.nodeValue}var n;var r={};if(e.attributes&&e.attributes.length){n={};for(var i=0;i<e.attributes.length;i++){var s=e.attributes[i].nodeName;if(typeof s!="string")continue;var o=e.attributes[i].nodeValue;if(!o)continue;if(typeof r[s]=="undefined")r[s]=0;r[s]++;this.addNode(n,s,r[s],o)}}if(e.childNodes&&e.childNodes.length){var u=true;if(n)u=false;for(var i=0;i<e.childNodes.length&&u;i++){var a=e.childNodes[i].nodeType;if(a==3||a==4)continue;u=false}if(u){if(!n)n="";for(var i=0;i<e.childNodes.length;i++){n+=e.childNodes[i].nodeValue}}else{if(!n)n={};for(var i=0;i<e.childNodes.length;i++){var s=e.childNodes[i].nodeName;if(typeof s!="string")continue;var o=this.parseElement(e.childNodes[i]);if(!o)continue;if(typeof r[s]=="undefined")r[s]=0;r[s]++;this.addNode(n,s,r[s],o)}}}return n};JKL.ParseXML.prototype.addNode=function(e,t,n,r){if(this.usearray==true){if(n==1)e[t]=[];e[t][e[t].length]=r}else if(this.usearray==false){if(n==1)e[t]=r}else if(this.usearray==null){if(n==1){e[t]=r}else if(n==2){e[t]=[e[t],r]}else{e[t][e[t].length]=r}}else if(this.usearray[t]){if(n==1)e[t]=[];e[t][e[t].length]=r}else{if(n==1)e[t]=r}};JKL.ParseXML.Text=function(e,t,n){this.http=new JKL.ParseXML.HTTP(e,t,n,true);return this};JKL.ParseXML.Text.prototype.parse=JKL.ParseXML.prototype.parse;JKL.ParseXML.Text.prototype.async=JKL.ParseXML.prototype.async;JKL.ParseXML.Text.prototype.onerror=JKL.ParseXML.prototype.onerror;JKL.ParseXML.Text.prototype.parseResponse=function(){var e=this.http.responseText();return e};JKL.ParseXML.JSON=function(e,t,n){this.http=new JKL.ParseXML.HTTP(e,t,n,true);return this};JKL.ParseXML.JSON.prototype.parse=JKL.ParseXML.prototype.parse;JKL.ParseXML.JSON.prototype.async=JKL.ParseXML.prototype.async;JKL.ParseXML.JSON.prototype.onerror=JKL.ParseXML.prototype.onerror;JKL.ParseXML.JSON.prototype.parseResponse=function(){var text=this.http.responseText();if(typeof text=="undefined")return;if(!text.length)return;var data=eval("("+text+")");return data};JKL.ParseXML.DOM=function(e,t,n){this.http=new JKL.ParseXML.HTTP(e,t,n,false);return this};JKL.ParseXML.DOM.prototype.parse=JKL.ParseXML.prototype.parse;JKL.ParseXML.DOM.prototype.async=JKL.ParseXML.prototype.async;JKL.ParseXML.DOM.prototype.onerror=JKL.ParseXML.prototype.onerror;JKL.ParseXML.DOM.prototype.parseResponse=function(){var e=this.http.documentElement();return e};JKL.ParseXML.CSV=function(e,t,n){this.http=new JKL.ParseXML.HTTP(e,t,n,true);return this};JKL.ParseXML.CSV.prototype.parse=JKL.ParseXML.prototype.parse;JKL.ParseXML.CSV.prototype.async=JKL.ParseXML.prototype.async;JKL.ParseXML.CSV.prototype.onerror=JKL.ParseXML.prototype.onerror;JKL.ParseXML.CSV.prototype.parseResponse=function(){var e=this.http.responseText();var t=this.parseCSV(e);return t};JKL.ParseXML.CSV.prototype.parseCSV=function(e){e=e.replace(/\r\n?/g,"\n");var t=0;var n=e.length;var r=[];while(t<n){var i=[];while(t<n){if(e.charAt(t)=='"'){var s=e.indexOf('"',t+1);while(s<n&&s>-1){if(e.charAt(s+1)!='"'){break}s=e.indexOf('"',s+2)}if(s<0){}else if(e.charAt(s+1)==","){var o=e.substr(t+1,s-t-1);o=o.replace(/""/g,'"');i[i.length]=o;t=s+2;continue}else if(e.charAt(s+1)=="\n"||n==s+1){var o=e.substr(t+1,s-t-1);o=o.replace(/""/g,'"');i[i.length]=o;t=s+2;break}else{}}var u=e.indexOf(",",t);var a=e.indexOf("\n",t);if(a<0)a=n;if(u>-1&&u<a){i[i.length]=e.substr(t,u-t);t=u+1}else{i[i.length]=e.substr(t,a-t);t=a+1;break}}if(i.length>=0){r[r.length]=i}}if(r.length<0)return;return r};JKL.ParseXML.CSVmap=function(e,t,n){this.http=new JKL.ParseXML.HTTP(e,t,n,true);return this};JKL.ParseXML.CSVmap.prototype.parse=JKL.ParseXML.prototype.parse;JKL.ParseXML.CSVmap.prototype.async=JKL.ParseXML.prototype.async;JKL.ParseXML.CSVmap.prototype.onerror=JKL.ParseXML.prototype.onerror;JKL.ParseXML.CSVmap.prototype.parseCSV=JKL.ParseXML.CSV.prototype.parseCSV;JKL.ParseXML.CSVmap.prototype.parseResponse=function(){var e=this.http.responseText();var t=this.parseCSV(e);if(!t)return;if(t.length<0)return;var n=t.shift();var r=[];for(var i=0;i<t.length;i++){var s={};for(var o=0;o<n.length&&o<t[i].length;o++){s[n[o]]=t[i][o]}r[r.length]=s}return r};JKL.ParseXML.LoadVars=function(e,t,n){this.http=new JKL.ParseXML.HTTP(e,t,n,true);return this};JKL.ParseXML.LoadVars.prototype.parse=JKL.ParseXML.prototype.parse;JKL.ParseXML.LoadVars.prototype.async=JKL.ParseXML.prototype.async;JKL.ParseXML.LoadVars.prototype.onerror=JKL.ParseXML.prototype.onerror;JKL.ParseXML.LoadVars.prototype.parseResponse=function(){var e=this.http.responseText();e=e.replace(/\r\n?/g,"\n");var t={};var n=e.split("&");for(var r=0;r<n.length;r++){var i=n[r].indexOf("=");if(i>-1){var s=decodeURIComponent(n[r].substr(0,i).replace("+","%20"));var o=decodeURIComponent(n[r].substr(i+1).replace("+","%20"));t[s]=o}else{t[n[r]]=""}}return t};JKL.ParseXML.HTTP=function(e,t,n,r){this.url=e;if(typeof t=="string"){this.query=t}else{this.query=""}if(n){this.method=n}else if(typeof t=="string"){this.method="POST"}else{this.method="GET"}this.textmode=r?true:false;this.req=null;this.xmldom_flag=false;this.onerror_func=null;this.callback_func=null;this.already_done=null;return this};JKL.ParseXML.HTTP.REQUEST_TYPE="application/x-www-form-urlencoded";JKL.ParseXML.HTTP.ACTIVEX_XMLDOM="Microsoft.XMLDOM";JKL.ParseXML.HTTP.ACTIVEX_XMLHTTP="Microsoft.XMLHTTP";JKL.ParseXML.HTTP.EPOCH_TIMESTAMP="Thu, 01 Jun 1970 00:00:00 GMT";JKL.ParseXML.HTTP.prototype.onerror=JKL.ParseXML.prototype.onerror;JKL.ParseXML.HTTP.prototype.async=function(e){this.async_func=e};JKL.ParseXML.HTTP.prototype.load=function(){if(window.ActiveXObject){var e=JKL.ParseXML.HTTP.ACTIVEX_XMLHTTP;if(this.method=="GET"&&!this.textmode){e=JKL.ParseXML.HTTP.ACTIVEX_XMLDOM}this.req=new ActiveXObject(e)}else if(window.XMLHttpRequest){this.req=new XMLHttpRequest}var t=this.async_func?true:false;if(typeof this.req.send!="undefined"){this.req.open(this.method,this.url,t)}if(typeof this.req.setRequestHeader!="undefined"){this.req.setRequestHeader("Content-Type",JKL.ParseXML.HTTP.REQUEST_TYPE)}if(typeof this.req.overrideMimeType!="undefined"&&!this.textmode){this.req.overrideMimeType(JKL.ParseXML.MIME_TYPE_XML)}if(t){var n=this;n.already_done=false;var r=function(){if(n.req.readyState!=4)return;var e=n.checkResponse();if(!e)return;if(n.already_done)return;n.already_done=true;n.async_func()};this.req.onreadystatechange=r}if(typeof this.req.send!="undefined"){this.req.send(this.query)}else if(typeof this.req.load!="undefined"){this.req.async=t;this.req.load(this.url)}if(t)return;var i=this.checkResponse()};JKL.ParseXML.HTTP.prototype.checkResponse=function(){if(this.req.parseError&&this.req.parseError.errorCode!=0){if(this.onerror_func)this.onerror_func(this.req.parseError.reason);return false}if(this.req.status-0>0&&this.req.status!=200&&this.req.status!=206&&this.req.status!=304){if(this.onerror_func)this.onerror_func(this.req.status);return false}return true};JKL.ParseXML.HTTP.prototype.documentElement=function(){if(!this.req)return;if(this.req.responseXML){return this.req.responseXML.documentElement}else{return this.req.documentElement}};JKL.ParseXML.HTTP.prototype.responseText=function(){if(!this.req)return;if(navigator.appVersion.match("KHTML")){var e=escape(this.req.responseText);if(!e.match("%u")&&e.match("%")){return decodeURIComponent(e)}}return this.req.responseText}

/* global.log()..? */
Soup.Session.prototype.add_feature.call(_httpSession, new Soup.ProxyResolverDefault());

function weatherDesklet(metadata, desklet_id) {
    this._init(metadata, desklet_id);
}

weatherDesklet.prototype = {
    __proto__: Desklet.Desklet.prototype,

    _init: function(metadata, desklet_id) {
        this.cc      = [];
        this.days    = [];
        this.labels  = [];
        this.tempd   = [];
        this.tempn   = [];
        this.eachday = [];
        this.fwicons = [];

        this.daynames = { Monday  : 'Mo',
                          Tuesday :'Tu',
                          Wednesday:'We',
                          Thursday:'Th',
                          Friday:'Fr',
                          Saturday:'Sa',
                          Sunday:'Su'
                        };

        this.test = 0;
        this.proces = null;
        this.update_id = null;
        this.metadata = metadata;
        this.dayNightSwitch = 'daytime'
        this.iconsPath = GLib.get_home_dir()+'/.local/share/cinnamon/desklets/weather-desklet@nask0/icons/';

        try {
            // Settings init
            Desklet.Desklet.prototype._init.call(this, metadata);

            this.settings = new Settings.DeskletSettings(this, 'weather-desklet@nask0', this.desklet_id);

            this.settings.bindProperty(Settings.BindingDirection.ONE_WAY,
                                       'locationCity',
                                       'locationCity',
                                       this.refreshWeather,
                                       null
                                      );
            this.settings.bindProperty(Settings.BindingDirection.ONE_WAY,
                                       'units',
                                       'units',
                                       this.refreshWeather,
                                       null
                                    );
            this.settings.bindProperty(Settings.BindingDirection.ONE_WAY,
                                      'transparency',
                                      'transparency',
                                      this.refreshWeather,
                                      null
                                    );
            this.settings.bindProperty(Settings.BindingDirection.ONE_WAY,
                                       'textcolor',
                                       'textcolor',
                                       this.refreshWeather,
                                       null
                                    );
            this.settings.bindProperty(Settings.BindingDirection.ONE_WAY,
                                       'bgcolor',
                                       'bgcolor',
                                       this.refreshWeather,
                                       null
                                    );
            this.settings.bindProperty(Settings.BindingDirection.ONE_WAY,
                                       'no',
                                       'no',
                                       this.refreshWeather,
                                       null
                                    );
            this.settings.bindProperty(Settings.BindingDirection.ONE_WAY,
                                       'zoom',
                                       'zoom',
                                       this.refreshWeather,
                                       null
                                    );
            this.settings.bindProperty(Settings.BindingDirection.ONE_WAY,
                                       'border',
                                       'border',
                                       this.refreshWeather,
                                       null
                                    );
            this.settings.bindProperty(Settings.BindingDirection.ONE_WAY,
                                       'bordercolor',
                                       'bordercolor',
                                       this.refreshWeather,
                                       null
                                    );

            this._menu.addMenuItem( new PopupMenu.PopupSeparatorMenuItem() );

            this._menu.addAction( _('Settings'),
                                  Lang.bind(this, function() { Util.spawnCommandLine('cinnamon-settings desklets weather-desklet@nask0') })
                                );

            let readmeFile = GLib.get_home_dir() + '/.local/share/cinnamon/desklets/weather-desklet@nask0/README';
            this._menu.addAction( _('Help'),
                                  Lang.bind(this, function() { Util.spawnCommandLine('xdg-open ' + this.readmeFile); })
                                );

            this.proces = true;
            this.refreshWeather();
        } catch (e) {
            global.logError(e);
        }

        return true;
    },

    reloadStyle: function() {
        this._separatorArea.height = this._getZoom(5);
        this.cwicon.width          = this._getZoom(200);
        this.cwicon.height         = this._getZoom(170);
        this.weathertext.style     = 'text-align:center; font-size:' + this._getZoom(30) + 'px';
        this.table.style           = 'spacing-rows:' + this._getZoom(5) + 'px; spacing-columns: ' + this._getZoom(5) + 'px; padding: ' + this._getZoom(10) + 'px;';
        this.cityName.style        = 'text-align:center;font-size:' + this._getZoom(14) + 'px';
        this.ctemp_captions.style  = 'text-align:right;font-size:' + this._getZoom(14) + 'px';
        this.ctemp_values.style    = 'text-align:left;font-size:' + this._getZoom(14) + 'px';

        if (this.border) {
            // @todo make border size configurable
            this.window.style = 'border: 2px solid ' + this.bordercolor + ';' +
                                'border-radius:12px;' +
                                'background-color:' + ( this.bgcolor.replace(')',',' + this.transparency + ')')).replace('rgb','rgba') + ';' +
                                'color:' + this.textcolor;
        } else {
            this.window.style = 'border-radius:12px;' +
                                'background-color:' + (this.bgcolor.replace(')',',' + this.transparency + ')')).replace('rgb','rgba')+';' +
                                'color:' + this.textcolor;
        }

        if ( this.no == 6 ) {
          this.temperature.style = 'font-size:' + this._getZoom(30) + 'px;text-align:center';
        } else {
          this.temperature.style = 'font-size:' + this._getZoom(14) + 'px;text-align:left';
        }

        for(let f=1; f<this.no; f++) {
            this.fwicons[f].width  = this._getZoom(60);
            this.fwicons[f].height = this._getZoom(50);
            this.labels[f].style = 'text-align:center;font-size:' + this._getZoom(14) + 'px';
            this.tempd[f].style  = 'text-align:center;font-size:' + this._getZoom(14) + 'px';
        }

        //~ this.banner.style = 'font-size:' + this._getZoom(14) + 'px;';
        this.buttons.style = 'padding-top:' + this._getZoom(3) + 'px;padding-bottom:' + this._getZoom(3) + 'px';

        this.iconButton.icon_size = this._getZoom(20);

        if (this.no != 6) {
          this.city.style = 'padding:' + this._getZoom(10) + 'px;';
        }
    },

    _getZoom: function(n) {
        let num = n;

        if ( !this._inArray(num, zoomCalcs) ) {
            zoomCalcs[num] = num * this.zoom;
        }

        return zoomCalcs[num];
    },

    _inArray : function in_array (needle, haystack, argStrict) {
        var key = '',
        strict = !! argStrict;

        if (strict) {
            for (key in haystack) {
                if (haystack[key] === needle) {
                    return true;
                }
            }
        } else {
            for (key in haystack) {
                if (haystack[key] == needle) {
                    return true;
                }
            }
        }
        return false;
    },

    createWindow: function() {
        this.window     = new St.BoxLayout({ vertical : false });

        this.buttons    = new St.BoxLayout({ vertical: false,
                                             style: 'padding-top:' + this._getZoom(3) + 'px;padding-bottom:' + this._getZoom(3) + 'px',
                                             x_align : 2
                                        });

        this.iconButton = new St.Icon({ icon_name: 'weather-clear-symbolic',
                                        icon_size: this._getZoom(20) + '',
                                        icon_type: St.IconType.SYMBOLIC
                                    });
        this.but = new St.Button();

        this.tempd   = [];
        this.labels  = [];
        this.fwicons = [];
        this.eachday = [];

        this.humidity    = new St.Label();
        this.pressure    = new St.Label();
        this.windSpeed   = new St.Label();
        this.feelsLike   = new St.Label();
        this.temperature = new St.Label();

        this._forecastIcons = new St.BoxLayout({vertical: false,x_align:2});
        this._separatorArea = new St.DrawingArea({ style_class: STYLE_POPUP_SEPARATOR_MENU_ITEM });

        this.ctemp_values   = new St.BoxLayout({vertical: true, style : 'text-align : left; font-size: '+14*this.zoom+"px"});
        this.ctemp_values   = new St.BoxLayout({vertical: true, style : 'text-align : left; font-size: '+14*this.zoom+"px"});
        this.ctemp_captions = new St.BoxLayout({vertical: true, style : 'text-align : right'});

        this.ctemp = new St.BoxLayout({vertical: false, x_align: 2});

        this.city = new St.BoxLayout({vertical:true,style: 'align: center;'});
        this.cityName = new St.Label({style: 'text-align: center;font-size: '+14*this.zoom+'px' });

        this.table = new St.Table({style: 'spacing-rows: ' + this._getZoom(5) + 'px;spacing-columns: ' + this._getZoom(5) + 'px;padding: ' + this._getZoom(10) + 'px;'});

        this.container = new St.BoxLayout({vertical: true, x_align: St.Align.MIDDLE});

        this.cweather = new St.BoxLayout({ vertical: true });

        this.cwicon = new St.Bin({ height: this._getZoom(70),
                                   width: this._getZoom(200)
                                }); //icon

        this.weathertext = new St.Label({style: 'text-align : center; font-size:' + this._getZoom(30) + 'px'});

        this.cweather.add_actor(this.cwicon);
        this.cweather.add_actor(this.weathertext);
        this.city.add_actor(this.cityName);

        if (this.no!=6) {
            this.ctemp_captions.add_actor(new St.Label({text: _('Temperature: ')}));
        };

        this.ctemp_captions.add_actor(new St.Label({text: _('Feels like: ')}));
        this.ctemp_captions.add_actor(new St.Label({text: _('Humidity: ')}));
        this.ctemp_captions.add_actor(new St.Label({text: _('Pressure: ')}));
        this.ctemp_captions.add_actor(new St.Label({text: _('Wind: ')}));

        if (this.no!=6) {
            this.ctemp_values.add_actor(this.temperature);
        };

        this.ctemp_values.add_actor(this.feelsLike);
        this.ctemp_values.add_actor(this.humidity);
        this.ctemp_values.add_actor(this.pressure);
        this.ctemp_values.add_actor(this.windSpeed);

        this.ctemp.add_actor(this.ctemp_captions);
        this.ctemp.add_actor(this.ctemp_values);

        if(this.no==6) {
            this.feelsLike.style = 'text-align:left;';  // this.feelsLike.style+="; border: 1px solid rgb(255,255,255)";
            this.temperature.style = 'font-size:' + this._getZoom(30) + 'px;text-align:center;';

            this.table.add(this.city,{row:0,col:0, col_span:2});
            this.table.add(this.temperature,{row:5,col:0});
            this.table.add(this.ctemp,{row:1,col:1, row_span:4,x_align:0});
        };

        for(let f=1;f<this.no;f++) {
            this.labels[f] =  new St.Label({style: 'text-align : center;font-size: ' + this._getZoom(14) + 'px' });
            this.fwicons[f] = new St.Bin({ height:this._getZoom(50),
                                           width: this._getZoom(60)
                                    });

            // this.fwicons[f].set_child(this._getIconImage(days[f]['weathericon']));

            this.eachday[f] = new St.BoxLayout({vertical: true });
            this.tempd[f]   = new St.Label({ style: 'text-align:center;font-size:' + this._getZoom(14) + 'px' });

            this.eachday[f].add_actor(this.labels[f]);
            this.eachday[f].add_actor(this.fwicons[f]);
            this.eachday[f].add_actor(this.tempd[f]);

            this._forecastIcons.add_actor(this.eachday[f]);
        }

        this.but.set_child(this.iconButton);
        this.but.connect('clicked', Lang.bind(this, this.changeForecast));

        //~ this.banner = new St.Label({text: _('AccuWeather.com'),style: 'font-size: '+14*this.zoom+"px"});
        //~ this.buttons.add_actor(this.but);
        //~ this.buttons.add_actor(this.banner);

        if (this.no == 6)  {
            this.container.add_actor(this.table);
        } else {
            this.city.style = 'padding:' + this._getZoom(10) + 'px';

            this.container.add_actor(this.city);
            this.container.add_actor(this.ctemp);
        }

        this.window.add_actor(this.cweather);
        this.window.add_actor(this.container);

        this.container.add_actor(this._separatorArea);
        this.container.add_actor(this._forecastIcons);
        this.container.add_actor(this.buttons);

        // global.log("exit window and test="+this.test);
        // global.log("exit and no="+this.no);
    },

    refreshWeather: function() {
        if (this.proces) {
            if(this.test != this.no) {
                this.test = this.no;
                this.createWindow();
            }

            this.reloadStyle();
            this.setContent(this.window);

            //~ let tst = this.getLocation( function(tesst) {
                    //~ global.logError(tesst);
                //~ });

            let a = this.getWeather( function(weatherXml) {
                counter = new Date().toLocaleFormat('%H%M');
                this.cc = this.parseWeatherXml(weatherXml);

                this.days = this.loadDays(weatherXml, this.dayNightSwitch);

                this.cwicon.set_child(this._getIconImage(this.cc['weathericon'])); // refresh


                this.weathertext.text = this.cc['weathertext'];


                this.cityName.text = this.cc['city']+' - '+this.cc['state'];
                this.temperature.text = this.cc['temperature']+((this.units==1) ? " \u2103" : " F");
                this.feelsLike.text = this.cc['realfeel']+((this.units==1) ? " \u2103" : " F");
                this.humidity.text = this.cc['humidity'].replace('%',' %');
                this.pressure.text = this.cc['pressure'] + ((this.units==1) ? ' kPa' : " IN");

                let wd = this.cc['winddirection'];
                (wd.length>2) ? wd = wd.replace(wd[0]+wd[1],wd[0]+'-'+wd[1]) : wd;

                this.windSpeed.text = wd + ' ' + this.cc['windSpeed'] + ((1 == this.units) ? ' km/h' : ' mph');

                for(let f=1; f<this.no; f++) {
                    this.labels[f].text=this.daynames[this.days[f]['daycode']];
                    this.fwicons[f].set_child(this._getIconImage(this.days[f]['weathericon']));
                    this.tempd[f].text=this.days[f]['realfeellow']+"-"+this.days[f]['realfeelhigh'];
                }
            });

            this._timeoutId=Mainloop.timeout_add_seconds(600+ Math.round(Math.random()*120), Lang.bind(this, this.refreshWeather));
            //this._timeoutId=Mainloop.timeout_add_seconds(10, Lang.bind(this, this.refreshWeather));
        }
    },

    _getIconImage: function(icon_name) {
        let icon_file = this.iconsPath + icon_name + ".PNG";
        let file = Gio.file_new_for_path(icon_file);
        let icon_uri = file.get_uri();

        return St.TextureCache.get_default().load_uri_async(icon_uri, 200*this.zoom, 200*this.zoom);
        // return St.TextureCache.get_default().load_uri_sync(1,icon_uri, 32, 32);
    },

    parseWeatherXml: function (doc) {
        let cc = []

        if(doc.split('failure') != doc) {
            cc['city'] = doc.split('failure')[1].substr(1,doc.split('failure')[1].length - 3);
            this.cityName.text=cc['city'];
        } else {
            cc['city'] = doc.split('city')[1].substr(1,doc.split('city')[1].length - 3);
            cc['state']= doc.split('state')[1].substr(1,doc.split('state')[1].length - 3);
            cc['time']=doc.split('time')[1].substr(1,doc.split('time')[1].length - 3);

            let currentconditions=doc.split('currentconditions')[1];

            cc['temperature'] = currentconditions.split('temperature')[1];
            cc['temperature'] = cc['temperature'].substr(1,cc['temperature'].length - 3);

            cc['observationtime'] = currentconditions.split('observationtime')[1];
            cc['observationtime'] = cc['observationtime'].substr(1,cc['observationtime'].length-3);

            cc['pressure'] = currentconditions.split('pressure')[1];
            cc['pressure'] = (cc['pressure'].split('>'))[1];
            cc['pressure'] = cc['pressure'].substr(0,cc['pressure'].length-2);

            cc['realfeel']= currentconditions.split('realfeel')[1];cc['realfeel']=cc['realfeel'].substr(1,cc['realfeel'].length - 3);

            cc['humidity']= currentconditions.split('humidity')[1];cc['humidity']=cc['humidity'].substr(1,cc['humidity'].length - 3);

            cc['weathertext']= currentconditions.split('weathertext')[1];cc['weathertext']=cc['weathertext'].substr(1,cc['weathertext'].length - 3);

            cc['weathericon']= currentconditions.split('weathericon')[1];cc['weathericon']=cc['weathericon'].substr(1,cc['weathericon'].length - 3);

            cc['windgusts'] = currentconditions.split('windgusts')[1];cc['windgusts']=cc['windgusts'].substr(1,cc['windgusts'].length - 3);

            cc['windSpeed'] = currentconditions.split('windspeed')[1];cc['windSpeed']=cc['windSpeed'].substr(1,cc['windSpeed'].length - 3);

            cc['winddirection'] = currentconditions.split('winddirection')[1];cc['winddirection']=cc['winddirection'].substr(1,cc['winddirection'].length - 3);

            cc['visibility'] = currentconditions.split('visibility')[1];cc['visibility']=cc['visibility'].substr(1,cc['visibility'].length - 3);

            cc['precip'] = currentconditions.split('precip')[1];cc['precip']=cc['precip'].substr(1,cc['precip'].length - 3);

            cc['uvindex']= currentconditions.split('uvindex')[1];cc['uvindex']=cc['uvindex'].substr(1,cc['uvindex'].length - 3);

            cc['dewpoint'] =currentconditions.split('dewpoint')[1];cc['dewpoint']=cc['dewpoint'].substr(1,cc['dewpoint'].length - 3);

            cc['cloudcover']=currentconditions.split('cloudcover')[1];cc['cloudcover']=cc['cloudcover'].substr(1,cc['cloudcover'].length - 3);
            // temperature=temperature.split('temperature')[1];
        }

        return cc;
    },

    loadDays: function (doc, what) {
        var days    = [];
        var nights  = [];
        let ziua    = [];
        let noaptea = [];

        let docs = doc.split('forecast>');
            docs = (docs[1] + '').split('<day number=');

        //this.label.text=(((docs[1]+"").split('daytime'))[1]).split('txtshort')[1];
        for ( let f=1; f<docs.length; f++) {
            let ziua = [];
            let d = (docs[f] + '').split('obsdate')[1] + '';
                d = d.substr(1,d.length-3);

            let dd = (docs[f] + '').split('daycode')[1] + '';
                dd = dd.substr(1,dd.length-3);

            ziua['date'] = d;
            noaptea['date'] = d;
            ziua['daycode'] = dd;
            noaptea['daycode'] = dd;

            //ziua['daycode']=dd;noaptea['daycode']=dd;

            let td = (docs[f] + '').split(what)[1] + '';

            ziua['txtshort'] = td.split('txtshort')[1];
            ziua['txtshort'] = ziua['txtshort'].substr(1,ziua['txtshort'].length-3);

            ziua['txtlong'] = td.split('txtlong')[1];
            ziua['txtlong'] = ziua['txtlong'].substr(1,ziua['txtlong'].length-3);

            ziua['weathericon'] = td.split('weathericon')[1];
            ziua['weathericon'] = ziua['weathericon'].substr(1,ziua['weathericon'].length-3);

            ziua['hightemperature'] = td.split('hightemperature')[1];
            ziua['hightemperature'] = ziua['hightemperature'].substr(1,ziua['hightemperature'].length-3);

            ziua['lowtemperature'] = td.split('lowtemperature')[1];
            ziua['lowtemperature']=ziua['lowtemperature'].substr(1,ziua['lowtemperature'].length-3);

            ziua['realfeelhigh'] = td.split('realfeelhigh')[1];
            ziua['realfeelhigh']=ziua['realfeelhigh'].substr(1,ziua['realfeelhigh'].length-3);

            ziua['realfeellow'] = td.split('realfeellow')[1];
            ziua['realfeellow']=ziua['realfeellow'].substr(1,ziua['realfeellow'].length-3);

            ziua['windspeed'] = td.split('windspeed')[1];
            ziua['windspeed']=ziua['windspeed'].substr(1,ziua['windspeed'].length-3);

            ziua['winddirection']=td.split('winddirection')[1];
            ziua['winddirection']=ziua['winddirection'].substr(1,ziua['winddirection'].length-3);

            ziua['windgust']=td.split('windgust')[1];
            ziua['windgust']=ziua['windgust'].substr(1,ziua['windgust'].length-3);

            ziua['maxuv']=td.split('maxuv')[1];
            ziua['maxuv']=ziua['maxuv'].substr(1,ziua['maxuv'].length-3);

            ziua['rainamount']=td.split('rainamount')[1];
            ziua['rainamount']=ziua['rainamount'].substr(1,ziua['rainamount'].length-3);

            ziua['snowamount']=td.split('snowamount')[1];
            ziua['snowamount']=ziua['snowamount'].substr(1,ziua['snowamount'].length-3);

            ziua['iceamount']=td.split('iceamount')[1];
            ziua['iceamount']=ziua['iceamount'].substr(1,ziua['iceamount'].length-3);

            ziua['precipamount']=td.split('precipamount')[1];
            ziua['precipamount']=ziua['precipamount'].substr(1,ziua['precipamount'].length-3);

            ziua['tstormprob']=td.split('tstormprob')[1];
            ziua['tstormprob']=ziua['tstormprob'].substr(1,ziua['tstormprob'].length-3);

            days[f]=ziua;
            ziua=[];
        }

        return days;
    },

    getLocation: function(callback) {
        let here = this;
        let locationDetectUrl = 'http://thale.accu-weather.com/widget/thale/city-find.asp?location=' + this.locationCity;

        let locResponse = Soup.Message.new('GET', locationDetectUrl);
        _httpSession.queue_message(locResponse, function (session, locResponse) {
            let msg = locResponse.response_body.data;
            callback.call(here, msg.toString());
        });
    },

    getWeather: function(callback) {
        let here = this;
        let weatherUrl = 'http://thale.accu-weather.com/widget/thale/weather-data.asp?location=' + this.locationCity + '&metric=' + this.units + '&format=json ' + counter + '';

        let message = Soup.Message.new('GET', weatherUrl);
        _httpSession.queue_message(message, function (session, message) {
            let msg = message.response_body.data;
            callback.call(here, msg.toString());
        });
    },

    changeForecast: function() {
        if(this.dayNightSwitch=='daytime') {
            this.dayNightSwitch='nighttime';
        } else {
            this.dayNightSwitch='daytime';
        }

        this.refreshWeather();
    },

    on_desklet_removed: function() {
      if(this._timeoutId) {
          Mainloop.source_remove(this._timeoutId);
        }
    }
}

// main
function main(metadata, desklet_id) {
    return new weatherDesklet(metadata, desklet_id);
}
