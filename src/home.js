
import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import './shared-styles.js';

class Home extends PolymerElement {
  static get template() {
    return html`

    <style include="shared-styles">
    .card {
      box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
      max-width: 300px;
      margin: auto;
      text-align: center;
      font-family: arial;
    }
    .name {
     color: #0070ff;
   }

   </style>


   <h2 style="text-align:center">Utilisateur</h2>

   <div class="card">
   <div class="circle"></div>
   <h1 class="name">Nom : [[username]] </h1>
   <p class="lang">Langue preferee : [[lang]] </p>
   <p class="token">Token :[[token]] </p>
   <input type="button" value="Logout" on-click="logout">    
   </div>     
   `;
 }


 static get properties() {

  return {
   tk: { type: String },
   lang: { type: String },
   username: { type: String }
 };   
} 

constructor() {
  super();   
  this.token = this.getToken() ;
  this.lang = window.navigator.language;
  this.username = this.getUrlVars()["name"];
}     

getUrlVars() {
  var vars = {};
  var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
    vars[key] = value;
  });
  return vars;
}

getToken(){
  var tk = {};
      var url = window.location.href; // retrieve url including token
      var re = '\=(.*)&';             // regex to match the token
      return tk = url.match(re);      // apply the regex
    }


    logout(){ 
      var url = "http://api.stable.gsked.dev.garda.com/wsdl/v1/?appname=doorman;version=1";
      var token_id = this.token[1];

      soap.createClient(url, function(_, soap) {               
        soap.logout({'token': token_id} , function(err, result){
          console.log('Kill the token',result);
          if(err){
            console.log('Err', err);
          }else{                 
            setTimeout(function(){ 
              window.location.href = './login'
            }, 1000);  
          } 
        })
        }) // createClient
    } // logout
  }

  window.customElements.define('my-home', Home);
