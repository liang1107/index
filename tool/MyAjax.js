import Vue from "vue";
import fetchJsonp from "fetch-jsonp";
export default {
	zeptoAjax(obj,callback){
		$.ajax({
			type:"get",
			url:obj.url,
			data:obj.data,
			dataType:obj.dataType,
			success:function(data){
				callback(data)
			}
		})
	},
	fetch(url,successCallback,failCallBack){
		fetch(url).then(function(response) {
		  return response.json();
		}).then(function(data) {
			//成功的回调
		  successCallback(data)
		}).catch(function(e) {
			//失败
		  failCallBack(e)
		});
	},
	fetchJsonp(url,successCallback,failCallBack){
		fetchJsonp(url).then(function(response) {
		  return response.json();
		}).then(function(data) {
			//成功的回调
		  successCallback(data)
		}).catch(function(e) {
			//失败
		  failCallBack(e)
		});
	},
	vueJson(url,successCallback,failCallBack){
		Vue.http.get(url).then(function(response){
			successCallback(response.body);
		},function(err){
			failCallBack(err);
		})
	},
	vueJsonp(url,successCallback,failCallBack){
		Vue.http.jsonp(url).then(function(response){
			successCallback(response.body);
		},function(err){
			failCallBack(err);
		})
	},
	vueJsonpOpt(url,opt,successCallback,failCallBack){
		Vue.http.jsonp(url,opt).then(function(response){
			successCallback(response.body);
		},function(err){
			failCallBack(err);
		})
	}
}
