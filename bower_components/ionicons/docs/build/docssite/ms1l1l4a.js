/*! Built with http://stenciljs.com */
const{h:e}=window.DocsSite;class t{constructor(){this.query="",this.size="small",this.autofocus="none",this.showClearCtrl=!1}watchQuery(){this.showClearCtrl=this.query.length>0}searchListener(e){if(27===e.keyCode)return void this.handleClear();const t=e.target.value;this.hasSearched.emit(t)}handleClear(){this.hasSearched.emit("")}componentWillLoad(){this.watchQuery()}render(){return e("div",{class:`search-input search-input--${this.size}`},e("input",{type:"text",placeholder:"Search icons...",value:this.query,autofocus:"autofocus"===this.autofocus?"autofocus":""}),e("i",{class:{"search-input__clear":!0,"search-input__clear--active":this.showClearCtrl,ion:!0,"ion-md-close":!0},onClick:this.handleClear.bind(this)}))}static get is(){return"icon-search"}static get properties(){return{autofocus:{type:String,attr:"autofocus"},query:{type:String,attr:"query",watchCallbacks:["watchQuery"]},showClearCtrl:{state:!0},size:{type:String,attr:"size"}}}static get events(){return[{name:"hasSearched",method:"hasSearched",bubbles:!0,cancelable:!0,composed:!0}]}static get listeners(){return[{name:"keyup",method:"searchListener"}]}static get style(){return"icon-search .search-input{position:relative}icon-search .search-input input{width:100%;font-weight:400;font-family:Eina;font-size:16px;border:0;outline:0;border-radius:6px;-webkit-box-sizing:border-box;box-sizing:border-box;display:block;-webkit-appearance:none;vertical-align:middle}icon-search .search-input__clear{-webkit-transition:background .3s,opacity .3s;transition:background .3s,opacity .3s;position:absolute;top:50%;-webkit-transform:translateY(-50%);transform:translateY(-50%);right:16px;font-size:14px;width:22px;height:22px;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;cursor:pointer;color:var(--color-pale-sky);opacity:0;background-color:var(--color-catskill-white);border-radius:100px}icon-search .search-input__clear--active{opacity:.8}icon-search .search-input__clear--active:hover{opacity:1;background-color:#e3e9f3}icon-search .search-input--small .search-input__clear{font-size:12px;width:18px;height:18px;background-color:#e3e9f3;right:12px}icon-search .search-input--small .search-input__clear--active:hover{background-color:#dce3f0}icon-search .search-input:before{font-family:Ionicons;content:\"\\f4a5\";color:var(--color-heather);position:absolute;height:24px;top:50%;-webkit-transform:translateY(-50%);transform:translateY(-50%)}icon-search .search-input--small input{font-size:13px;line-height:18px;padding:10px;padding-left:30px;padding-right:30px;background-color:#f6f7f9;height:39px;text-indent:0}icon-search .search-input--small:before{font-size:18px;left:10px}icon-search .search-input--large input{-webkit-transition:-webkit-box-shadow .3s;transition:-webkit-box-shadow .3s;transition:box-shadow .3s;transition:box-shadow .3s,-webkit-box-shadow .3s;font-size:16px;line-height:22px;padding:20px;padding-left:50px;padding-right:50px;background-color:#fff;-webkit-box-shadow:0 3px 6px 0 rgba(0,0,0,.1),0 1px 3px 0 rgba(0,0,0,.08);box-shadow:0 3px 6px 0 rgba(0,0,0,.1),0 1px 3px 0 rgba(0,0,0,.08)}icon-search .search-input--large input:focus{-webkit-box-shadow:0 6px 12px 0 rgba(0,0,0,.1),0 1px 3px 0 rgba(0,0,0,.08);box-shadow:0 6px 12px 0 rgba(0,0,0,.1),0 1px 3px 0 rgba(0,0,0,.08)}icon-search .search-input--large:before{font-size:22px;left:20px}icon-search .search-input input::-webkit-input-placeholder{color:var(--color-heather)}icon-search .search-input input:-ms-input-placeholder{color:var(--color-heather)}icon-search .search-input input::-ms-input-placeholder{color:var(--color-heather)}icon-search .search-input input::placeholder{color:var(--color-heather)}"}}export{t as IconSearch};