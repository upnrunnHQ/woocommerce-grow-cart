!function(){var t={4184:function(t,e){var n;!function(){"use strict";var i={}.hasOwnProperty;function r(){for(var t=[],e=0;e<arguments.length;e++){var n=arguments[e];if(n){var o=typeof n;if("string"===o||"number"===o)t.push(n);else if(Array.isArray(n)){if(n.length){var u=r.apply(null,n);u&&t.push(u)}}else if("object"===o)if(n.toString===Object.prototype.toString)for(var s in n)i.call(n,s)&&n[s]&&t.push(s);else t.push(n.toString())}}return t.join(" ")}t.exports?(r.default=r,t.exports=r):void 0===(n=function(){return r}.apply(e,[]))||(t.exports=n)}()},9852:function(t,e,n){"use strict";n.d(e,{j:function(){return u}});var i=n(1721),r=n(2943),o=n(2288),u=new(function(t){function e(){var e;return(e=t.call(this)||this).setup=function(t){var e;if(!o.sk&&(null==(e=window)?void 0:e.addEventListener)){var n=function(){return t()};return window.addEventListener("visibilitychange",n,!1),window.addEventListener("focus",n,!1),function(){window.removeEventListener("visibilitychange",n),window.removeEventListener("focus",n)}}},e}(0,i.Z)(e,t);var n=e.prototype;return n.onSubscribe=function(){this.cleanup||this.setEventListener(this.setup)},n.onUnsubscribe=function(){var t;this.hasListeners()||(null==(t=this.cleanup)||t.call(this),this.cleanup=void 0)},n.setEventListener=function(t){var e,n=this;this.setup=t,null==(e=this.cleanup)||e.call(this),this.cleanup=t((function(t){"boolean"==typeof t?n.setFocused(t):n.onFocus()}))},n.setFocused=function(t){this.focused=t,t&&this.onFocus()},n.onFocus=function(){this.listeners.forEach((function(t){t()}))},n.isFocused=function(){return"boolean"==typeof this.focused?this.focused:"undefined"==typeof document||[void 0,"visible","prerender"].includes(document.visibilityState)},e}(r.l))},6747:function(t,e,n){"use strict";n.d(e,{Su:function(){return i.S}});var i=n(7323),r=n(6755);n.o(r,"QueryClientProvider")&&n.d(e,{QueryClientProvider:function(){return r.QueryClientProvider}})},1909:function(t,e,n){"use strict";n.d(e,{j:function(){return r},E:function(){return o}});var i=console;function r(){return i}function o(t){i=t}},1262:function(t,e,n){"use strict";n.d(e,{m:function(){return a}});var i=n(7462),r=n(1909),o=n(101),u=n(1216),s=n(2288),a=function(){function t(t){this.options=(0,i.Z)({},t.defaultOptions,t.options),this.mutationId=t.mutationId,this.mutationCache=t.mutationCache,this.observers=[],this.state=t.state||{context:void 0,data:void 0,error:null,failureCount:0,isPaused:!1,status:"idle",variables:void 0},this.meta=t.meta}var e=t.prototype;return e.setState=function(t){this.dispatch({type:"setState",state:t})},e.addObserver=function(t){-1===this.observers.indexOf(t)&&this.observers.push(t)},e.removeObserver=function(t){this.observers=this.observers.filter((function(e){return e!==t}))},e.cancel=function(){return this.retryer?(this.retryer.cancel(),this.retryer.promise.then(s.ZT).catch(s.ZT)):Promise.resolve()},e.continue=function(){return this.retryer?(this.retryer.continue(),this.retryer.promise):this.execute()},e.execute=function(){var t,e=this,n="loading"===this.state.status,i=Promise.resolve();return n||(this.dispatch({type:"loading",variables:this.options.variables}),i=i.then((function(){null==e.mutationCache.config.onMutate||e.mutationCache.config.onMutate(e.state.variables,e)})).then((function(){return null==e.options.onMutate?void 0:e.options.onMutate(e.state.variables)})).then((function(t){t!==e.state.context&&e.dispatch({type:"loading",context:t,variables:e.state.variables})}))),i.then((function(){return e.executeMutation()})).then((function(n){t=n,null==e.mutationCache.config.onSuccess||e.mutationCache.config.onSuccess(t,e.state.variables,e.state.context,e)})).then((function(){return null==e.options.onSuccess?void 0:e.options.onSuccess(t,e.state.variables,e.state.context)})).then((function(){return null==e.options.onSettled?void 0:e.options.onSettled(t,null,e.state.variables,e.state.context)})).then((function(){return e.dispatch({type:"success",data:t}),t})).catch((function(t){return null==e.mutationCache.config.onError||e.mutationCache.config.onError(t,e.state.variables,e.state.context,e),(0,r.j)().error(t),Promise.resolve().then((function(){return null==e.options.onError?void 0:e.options.onError(t,e.state.variables,e.state.context)})).then((function(){return null==e.options.onSettled?void 0:e.options.onSettled(void 0,t,e.state.variables,e.state.context)})).then((function(){throw e.dispatch({type:"error",error:t}),t}))}))},e.executeMutation=function(){var t,e=this;return this.retryer=new u.m4({fn:function(){return e.options.mutationFn?e.options.mutationFn(e.state.variables):Promise.reject("No mutationFn found")},onFail:function(){e.dispatch({type:"failed"})},onPause:function(){e.dispatch({type:"pause"})},onContinue:function(){e.dispatch({type:"continue"})},retry:null!=(t=this.options.retry)?t:0,retryDelay:this.options.retryDelay}),this.retryer.promise},e.dispatch=function(t){var e=this;this.state=function(t,e){switch(e.type){case"failed":return(0,i.Z)({},t,{failureCount:t.failureCount+1});case"pause":return(0,i.Z)({},t,{isPaused:!0});case"continue":return(0,i.Z)({},t,{isPaused:!1});case"loading":return(0,i.Z)({},t,{context:e.context,data:void 0,error:null,isPaused:!1,status:"loading",variables:e.variables});case"success":return(0,i.Z)({},t,{data:e.data,error:null,status:"success",isPaused:!1});case"error":return(0,i.Z)({},t,{data:void 0,error:e.error,failureCount:t.failureCount+1,isPaused:!1,status:"error"});case"setState":return(0,i.Z)({},t,e.state);default:return t}}(this.state,t),o.V.batch((function(){e.observers.forEach((function(e){e.onMutationUpdate(t)})),e.mutationCache.notify(e)}))},t}()},101:function(t,e,n){"use strict";n.d(e,{V:function(){return o}});var i=n(2288),r=function(){function t(){this.queue=[],this.transactions=0,this.notifyFn=function(t){t()},this.batchNotifyFn=function(t){t()}}var e=t.prototype;return e.batch=function(t){this.transactions++;var e=t();return this.transactions--,this.transactions||this.flush(),e},e.schedule=function(t){var e=this;this.transactions?this.queue.push(t):(0,i.A4)((function(){e.notifyFn(t)}))},e.batchCalls=function(t){var e=this;return function(){for(var n=arguments.length,i=new Array(n),r=0;r<n;r++)i[r]=arguments[r];e.schedule((function(){t.apply(void 0,i)}))}},e.flush=function(){var t=this,e=this.queue;this.queue=[],e.length&&(0,i.A4)((function(){t.batchNotifyFn((function(){e.forEach((function(e){t.notifyFn(e)}))}))}))},e.setNotifyFunction=function(t){this.notifyFn=t},e.setBatchNotifyFunction=function(t){this.batchNotifyFn=t},t}(),o=new r},68:function(t,e,n){"use strict";n.d(e,{N:function(){return u}});var i=n(1721),r=n(2943),o=n(2288),u=new(function(t){function e(){var e;return(e=t.call(this)||this).setup=function(t){var e;if(!o.sk&&(null==(e=window)?void 0:e.addEventListener)){var n=function(){return t()};return window.addEventListener("online",n,!1),window.addEventListener("offline",n,!1),function(){window.removeEventListener("online",n),window.removeEventListener("offline",n)}}},e}(0,i.Z)(e,t);var n=e.prototype;return n.onSubscribe=function(){this.cleanup||this.setEventListener(this.setup)},n.onUnsubscribe=function(){var t;this.hasListeners()||(null==(t=this.cleanup)||t.call(this),this.cleanup=void 0)},n.setEventListener=function(t){var e,n=this;this.setup=t,null==(e=this.cleanup)||e.call(this),this.cleanup=t((function(t){"boolean"==typeof t?n.setOnline(t):n.onOnline()}))},n.setOnline=function(t){this.online=t,t&&this.onOnline()},n.onOnline=function(){this.listeners.forEach((function(t){t()}))},n.isOnline=function(){return"boolean"==typeof this.online?this.online:"undefined"==typeof navigator||void 0===navigator.onLine||navigator.onLine},e}(r.l))},7323:function(t,e,n){"use strict";n.d(e,{S:function(){return m}});var i=n(7462),r=n(2288),o=n(1721),u=n(101),s=n(1909),a=n(1216),c=function(){function t(t){this.abortSignalConsumed=!1,this.hadObservers=!1,this.defaultOptions=t.defaultOptions,this.setOptions(t.options),this.observers=[],this.cache=t.cache,this.queryKey=t.queryKey,this.queryHash=t.queryHash,this.initialState=t.state||this.getDefaultState(this.options),this.state=this.initialState,this.meta=t.meta,this.scheduleGc()}var e=t.prototype;return e.setOptions=function(t){var e;this.options=(0,i.Z)({},this.defaultOptions,t),this.meta=null==t?void 0:t.meta,this.cacheTime=Math.max(this.cacheTime||0,null!=(e=this.options.cacheTime)?e:3e5)},e.setDefaultOptions=function(t){this.defaultOptions=t},e.scheduleGc=function(){var t=this;this.clearGcTimeout(),(0,r.PN)(this.cacheTime)&&(this.gcTimeout=setTimeout((function(){t.optionalRemove()}),this.cacheTime))},e.clearGcTimeout=function(){clearTimeout(this.gcTimeout),this.gcTimeout=void 0},e.optionalRemove=function(){this.observers.length||(this.state.isFetching?this.hadObservers&&this.scheduleGc():this.cache.remove(this))},e.setData=function(t,e){var n,i,o=this.state.data,u=(0,r.SE)(t,o);return(null==(n=(i=this.options).isDataEqual)?void 0:n.call(i,o,u))?u=o:!1!==this.options.structuralSharing&&(u=(0,r.Q$)(o,u)),this.dispatch({data:u,type:"success",dataUpdatedAt:null==e?void 0:e.updatedAt}),u},e.setState=function(t,e){this.dispatch({type:"setState",state:t,setStateOptions:e})},e.cancel=function(t){var e,n=this.promise;return null==(e=this.retryer)||e.cancel(t),n?n.then(r.ZT).catch(r.ZT):Promise.resolve()},e.destroy=function(){this.clearGcTimeout(),this.cancel({silent:!0})},e.reset=function(){this.destroy(),this.setState(this.initialState)},e.isActive=function(){return this.observers.some((function(t){return!1!==t.options.enabled}))},e.isFetching=function(){return this.state.isFetching},e.isStale=function(){return this.state.isInvalidated||!this.state.dataUpdatedAt||this.observers.some((function(t){return t.getCurrentResult().isStale}))},e.isStaleByTime=function(t){return void 0===t&&(t=0),this.state.isInvalidated||!this.state.dataUpdatedAt||!(0,r.Kp)(this.state.dataUpdatedAt,t)},e.onFocus=function(){var t,e=this.observers.find((function(t){return t.shouldFetchOnWindowFocus()}));e&&e.refetch(),null==(t=this.retryer)||t.continue()},e.onOnline=function(){var t,e=this.observers.find((function(t){return t.shouldFetchOnReconnect()}));e&&e.refetch(),null==(t=this.retryer)||t.continue()},e.addObserver=function(t){-1===this.observers.indexOf(t)&&(this.observers.push(t),this.hadObservers=!0,this.clearGcTimeout(),this.cache.notify({type:"observerAdded",query:this,observer:t}))},e.removeObserver=function(t){-1!==this.observers.indexOf(t)&&(this.observers=this.observers.filter((function(e){return e!==t})),this.observers.length||(this.retryer&&(this.retryer.isTransportCancelable||this.abortSignalConsumed?this.retryer.cancel({revert:!0}):this.retryer.cancelRetry()),this.cacheTime?this.scheduleGc():this.cache.remove(this)),this.cache.notify({type:"observerRemoved",query:this,observer:t}))},e.getObserversCount=function(){return this.observers.length},e.invalidate=function(){this.state.isInvalidated||this.dispatch({type:"invalidate"})},e.fetch=function(t,e){var n,i,o,u=this;if(this.state.isFetching)if(this.state.dataUpdatedAt&&(null==e?void 0:e.cancelRefetch))this.cancel({silent:!0});else if(this.promise){var c;return null==(c=this.retryer)||c.continueRetry(),this.promise}if(t&&this.setOptions(t),!this.options.queryFn){var l=this.observers.find((function(t){return t.options.queryFn}));l&&this.setOptions(l.options)}var f=(0,r.mc)(this.queryKey),h=(0,r.G9)(),d={queryKey:f,pageParam:void 0,meta:this.meta};Object.defineProperty(d,"signal",{enumerable:!0,get:function(){if(h)return u.abortSignalConsumed=!0,h.signal}});var v,p,y={fetchOptions:e,options:this.options,queryKey:f,state:this.state,fetchFn:function(){return u.options.queryFn?(u.abortSignalConsumed=!1,u.options.queryFn(d)):Promise.reject("Missing queryFn")},meta:this.meta};return(null==(n=this.options.behavior)?void 0:n.onFetch)&&(null==(v=this.options.behavior)||v.onFetch(y)),this.revertState=this.state,this.state.isFetching&&this.state.fetchMeta===(null==(i=y.fetchOptions)?void 0:i.meta)||this.dispatch({type:"fetch",meta:null==(p=y.fetchOptions)?void 0:p.meta}),this.retryer=new a.m4({fn:y.fetchFn,abort:null==h||null==(o=h.abort)?void 0:o.bind(h),onSuccess:function(t){u.setData(t),null==u.cache.config.onSuccess||u.cache.config.onSuccess(t,u),0===u.cacheTime&&u.optionalRemove()},onError:function(t){(0,a.DV)(t)&&t.silent||u.dispatch({type:"error",error:t}),(0,a.DV)(t)||(null==u.cache.config.onError||u.cache.config.onError(t,u),(0,s.j)().error(t)),0===u.cacheTime&&u.optionalRemove()},onFail:function(){u.dispatch({type:"failed"})},onPause:function(){u.dispatch({type:"pause"})},onContinue:function(){u.dispatch({type:"continue"})},retry:y.options.retry,retryDelay:y.options.retryDelay}),this.promise=this.retryer.promise,this.promise},e.dispatch=function(t){var e=this;this.state=this.reducer(this.state,t),u.V.batch((function(){e.observers.forEach((function(e){e.onQueryUpdate(t)})),e.cache.notify({query:e,type:"queryUpdated",action:t})}))},e.getDefaultState=function(t){var e="function"==typeof t.initialData?t.initialData():t.initialData,n=void 0!==t.initialData?"function"==typeof t.initialDataUpdatedAt?t.initialDataUpdatedAt():t.initialDataUpdatedAt:0,i=void 0!==e;return{data:e,dataUpdateCount:0,dataUpdatedAt:i?null!=n?n:Date.now():0,error:null,errorUpdateCount:0,errorUpdatedAt:0,fetchFailureCount:0,fetchMeta:null,isFetching:!1,isInvalidated:!1,isPaused:!1,status:i?"success":"idle"}},e.reducer=function(t,e){var n,r;switch(e.type){case"failed":return(0,i.Z)({},t,{fetchFailureCount:t.fetchFailureCount+1});case"pause":return(0,i.Z)({},t,{isPaused:!0});case"continue":return(0,i.Z)({},t,{isPaused:!1});case"fetch":return(0,i.Z)({},t,{fetchFailureCount:0,fetchMeta:null!=(n=e.meta)?n:null,isFetching:!0,isPaused:!1},!t.dataUpdatedAt&&{error:null,status:"loading"});case"success":return(0,i.Z)({},t,{data:e.data,dataUpdateCount:t.dataUpdateCount+1,dataUpdatedAt:null!=(r=e.dataUpdatedAt)?r:Date.now(),error:null,fetchFailureCount:0,isFetching:!1,isInvalidated:!1,isPaused:!1,status:"success"});case"error":var o=e.error;return(0,a.DV)(o)&&o.revert&&this.revertState?(0,i.Z)({},this.revertState):(0,i.Z)({},t,{error:o,errorUpdateCount:t.errorUpdateCount+1,errorUpdatedAt:Date.now(),fetchFailureCount:t.fetchFailureCount+1,isFetching:!1,isPaused:!1,status:"error"});case"invalidate":return(0,i.Z)({},t,{isInvalidated:!0});case"setState":return(0,i.Z)({},t,e.state);default:return t}},t}(),l=n(2943),f=function(t){function e(e){var n;return(n=t.call(this)||this).config=e||{},n.queries=[],n.queriesMap={},n}(0,o.Z)(e,t);var n=e.prototype;return n.build=function(t,e,n){var i,o=e.queryKey,u=null!=(i=e.queryHash)?i:(0,r.Rm)(o,e),s=this.get(u);return s||(s=new c({cache:this,queryKey:o,queryHash:u,options:t.defaultQueryOptions(e),state:n,defaultOptions:t.getQueryDefaults(o),meta:e.meta}),this.add(s)),s},n.add=function(t){this.queriesMap[t.queryHash]||(this.queriesMap[t.queryHash]=t,this.queries.push(t),this.notify({type:"queryAdded",query:t}))},n.remove=function(t){var e=this.queriesMap[t.queryHash];e&&(t.destroy(),this.queries=this.queries.filter((function(e){return e!==t})),e===t&&delete this.queriesMap[t.queryHash],this.notify({type:"queryRemoved",query:t}))},n.clear=function(){var t=this;u.V.batch((function(){t.queries.forEach((function(e){t.remove(e)}))}))},n.get=function(t){return this.queriesMap[t]},n.getAll=function(){return this.queries},n.find=function(t,e){var n=(0,r.I6)(t,e)[0];return void 0===n.exact&&(n.exact=!0),this.queries.find((function(t){return(0,r._x)(n,t)}))},n.findAll=function(t,e){var n=(0,r.I6)(t,e)[0];return Object.keys(n).length>0?this.queries.filter((function(t){return(0,r._x)(n,t)})):this.queries},n.notify=function(t){var e=this;u.V.batch((function(){e.listeners.forEach((function(e){e(t)}))}))},n.onFocus=function(){var t=this;u.V.batch((function(){t.queries.forEach((function(t){t.onFocus()}))}))},n.onOnline=function(){var t=this;u.V.batch((function(){t.queries.forEach((function(t){t.onOnline()}))}))},e}(l.l),h=n(1262),d=function(t){function e(e){var n;return(n=t.call(this)||this).config=e||{},n.mutations=[],n.mutationId=0,n}(0,o.Z)(e,t);var n=e.prototype;return n.build=function(t,e,n){var i=new h.m({mutationCache:this,mutationId:++this.mutationId,options:t.defaultMutationOptions(e),state:n,defaultOptions:e.mutationKey?t.getMutationDefaults(e.mutationKey):void 0,meta:e.meta});return this.add(i),i},n.add=function(t){this.mutations.push(t),this.notify(t)},n.remove=function(t){this.mutations=this.mutations.filter((function(e){return e!==t})),t.cancel(),this.notify(t)},n.clear=function(){var t=this;u.V.batch((function(){t.mutations.forEach((function(e){t.remove(e)}))}))},n.getAll=function(){return this.mutations},n.find=function(t){return void 0===t.exact&&(t.exact=!0),this.mutations.find((function(e){return(0,r.X7)(t,e)}))},n.findAll=function(t){return this.mutations.filter((function(e){return(0,r.X7)(t,e)}))},n.notify=function(t){var e=this;u.V.batch((function(){e.listeners.forEach((function(e){e(t)}))}))},n.onFocus=function(){this.resumePausedMutations()},n.onOnline=function(){this.resumePausedMutations()},n.resumePausedMutations=function(){var t=this.mutations.filter((function(t){return t.state.isPaused}));return u.V.batch((function(){return t.reduce((function(t,e){return t.then((function(){return e.continue().catch(r.ZT)}))}),Promise.resolve())}))},e}(l.l),v=n(9852),p=n(68);function y(t,e){return null==t.getNextPageParam?void 0:t.getNextPageParam(e[e.length-1],e)}var m=function(){function t(t){void 0===t&&(t={}),this.queryCache=t.queryCache||new f,this.mutationCache=t.mutationCache||new d,this.defaultOptions=t.defaultOptions||{},this.queryDefaults=[],this.mutationDefaults=[]}var e=t.prototype;return e.mount=function(){var t=this;this.unsubscribeFocus=v.j.subscribe((function(){v.j.isFocused()&&p.N.isOnline()&&(t.mutationCache.onFocus(),t.queryCache.onFocus())})),this.unsubscribeOnline=p.N.subscribe((function(){v.j.isFocused()&&p.N.isOnline()&&(t.mutationCache.onOnline(),t.queryCache.onOnline())}))},e.unmount=function(){var t,e;null==(t=this.unsubscribeFocus)||t.call(this),null==(e=this.unsubscribeOnline)||e.call(this)},e.isFetching=function(t,e){var n=(0,r.I6)(t,e)[0];return n.fetching=!0,this.queryCache.findAll(n).length},e.isMutating=function(t){return this.mutationCache.findAll((0,i.Z)({},t,{fetching:!0})).length},e.getQueryData=function(t,e){var n;return null==(n=this.queryCache.find(t,e))?void 0:n.state.data},e.getQueriesData=function(t){return this.getQueryCache().findAll(t).map((function(t){return[t.queryKey,t.state.data]}))},e.setQueryData=function(t,e,n){var i=(0,r._v)(t),o=this.defaultQueryOptions(i);return this.queryCache.build(this,o).setData(e,n)},e.setQueriesData=function(t,e,n){var i=this;return u.V.batch((function(){return i.getQueryCache().findAll(t).map((function(t){var r=t.queryKey;return[r,i.setQueryData(r,e,n)]}))}))},e.getQueryState=function(t,e){var n;return null==(n=this.queryCache.find(t,e))?void 0:n.state},e.removeQueries=function(t,e){var n=(0,r.I6)(t,e)[0],i=this.queryCache;u.V.batch((function(){i.findAll(n).forEach((function(t){i.remove(t)}))}))},e.resetQueries=function(t,e,n){var o=this,s=(0,r.I6)(t,e,n),a=s[0],c=s[1],l=this.queryCache,f=(0,i.Z)({},a,{active:!0});return u.V.batch((function(){return l.findAll(a).forEach((function(t){t.reset()})),o.refetchQueries(f,c)}))},e.cancelQueries=function(t,e,n){var i=this,o=(0,r.I6)(t,e,n),s=o[0],a=o[1],c=void 0===a?{}:a;void 0===c.revert&&(c.revert=!0);var l=u.V.batch((function(){return i.queryCache.findAll(s).map((function(t){return t.cancel(c)}))}));return Promise.all(l).then(r.ZT).catch(r.ZT)},e.invalidateQueries=function(t,e,n){var o,s,a,c=this,l=(0,r.I6)(t,e,n),f=l[0],h=l[1],d=(0,i.Z)({},f,{active:null==(o=null!=(s=f.refetchActive)?s:f.active)||o,inactive:null!=(a=f.refetchInactive)&&a});return u.V.batch((function(){return c.queryCache.findAll(f).forEach((function(t){t.invalidate()})),c.refetchQueries(d,h)}))},e.refetchQueries=function(t,e,n){var o=this,s=(0,r.I6)(t,e,n),a=s[0],c=s[1],l=u.V.batch((function(){return o.queryCache.findAll(a).map((function(t){return t.fetch(void 0,(0,i.Z)({},c,{meta:{refetchPage:null==a?void 0:a.refetchPage}}))}))})),f=Promise.all(l).then(r.ZT);return(null==c?void 0:c.throwOnError)||(f=f.catch(r.ZT)),f},e.fetchQuery=function(t,e,n){var i=(0,r._v)(t,e,n),o=this.defaultQueryOptions(i);void 0===o.retry&&(o.retry=!1);var u=this.queryCache.build(this,o);return u.isStaleByTime(o.staleTime)?u.fetch(o):Promise.resolve(u.state.data)},e.prefetchQuery=function(t,e,n){return this.fetchQuery(t,e,n).then(r.ZT).catch(r.ZT)},e.fetchInfiniteQuery=function(t,e,n){var i=(0,r._v)(t,e,n);return i.behavior={onFetch:function(t){t.fetchFn=function(){var e,n,i,o,u,s,c,l,f,h=null==(e=t.fetchOptions)||null==(n=e.meta)?void 0:n.refetchPage,d=null==(i=t.fetchOptions)||null==(o=i.meta)?void 0:o.fetchMore,v=null==d?void 0:d.pageParam,p="forward"===(null==d?void 0:d.direction),m="backward"===(null==d?void 0:d.direction),b=(null==(u=t.state.data)?void 0:u.pages)||[],g=(null==(s=t.state.data)?void 0:s.pageParams)||[],C=(0,r.G9)(),O=null==C?void 0:C.signal,P=g,w=!1,q=t.options.queryFn||function(){return Promise.reject("Missing queryFn")},E=function(t,e,n,i){return P=i?[e].concat(P):[].concat(P,[e]),i?[n].concat(t):[].concat(t,[n])},F=function(e,n,i,r){if(w)return Promise.reject("Cancelled");if(void 0===i&&!n&&e.length)return Promise.resolve(e);var o={queryKey:t.queryKey,signal:O,pageParam:i,meta:t.meta},u=q(o),s=Promise.resolve(u).then((function(t){return E(e,i,t,r)}));return(0,a.LE)(u)&&(s.cancel=u.cancel),s};if(b.length)if(p){var S=void 0!==v,x=S?v:y(t.options,b);c=F(b,S,x)}else if(m){var A=void 0!==v,D=A?v:(l=t.options,f=b,null==l.getPreviousPageParam?void 0:l.getPreviousPageParam(f[0],f));c=F(b,A,D,!0)}else!function(){P=[];var e=void 0===t.options.getNextPageParam,n=!h||!b[0]||h(b[0],0,b);c=n?F([],e,g[0]):Promise.resolve(E([],g[0],b[0]));for(var i=function(n){c=c.then((function(i){if(!h||!b[n]||h(b[n],n,b)){var r=e?g[n]:y(t.options,i);return F(i,e,r)}return Promise.resolve(E(i,g[n],b[n]))}))},r=1;r<b.length;r++)i(r)}();else c=F([]);var Q=c.then((function(t){return{pages:t,pageParams:P}}));return Q.cancel=function(){w=!0,null==C||C.abort(),(0,a.LE)(c)&&c.cancel()},Q}}},this.fetchQuery(i)},e.prefetchInfiniteQuery=function(t,e,n){return this.fetchInfiniteQuery(t,e,n).then(r.ZT).catch(r.ZT)},e.cancelMutations=function(){var t=this,e=u.V.batch((function(){return t.mutationCache.getAll().map((function(t){return t.cancel()}))}));return Promise.all(e).then(r.ZT).catch(r.ZT)},e.resumePausedMutations=function(){return this.getMutationCache().resumePausedMutations()},e.executeMutation=function(t){return this.mutationCache.build(this,t).execute()},e.getQueryCache=function(){return this.queryCache},e.getMutationCache=function(){return this.mutationCache},e.getDefaultOptions=function(){return this.defaultOptions},e.setDefaultOptions=function(t){this.defaultOptions=t},e.setQueryDefaults=function(t,e){var n=this.queryDefaults.find((function(e){return(0,r.yF)(t)===(0,r.yF)(e.queryKey)}));n?n.defaultOptions=e:this.queryDefaults.push({queryKey:t,defaultOptions:e})},e.getQueryDefaults=function(t){var e;return t?null==(e=this.queryDefaults.find((function(e){return(0,r.to)(t,e.queryKey)})))?void 0:e.defaultOptions:void 0},e.setMutationDefaults=function(t,e){var n=this.mutationDefaults.find((function(e){return(0,r.yF)(t)===(0,r.yF)(e.mutationKey)}));n?n.defaultOptions=e:this.mutationDefaults.push({mutationKey:t,defaultOptions:e})},e.getMutationDefaults=function(t){var e;return t?null==(e=this.mutationDefaults.find((function(e){return(0,r.to)(t,e.mutationKey)})))?void 0:e.defaultOptions:void 0},e.defaultQueryOptions=function(t){if(null==t?void 0:t._defaulted)return t;var e=(0,i.Z)({},this.defaultOptions.queries,this.getQueryDefaults(null==t?void 0:t.queryKey),t,{_defaulted:!0});return!e.queryHash&&e.queryKey&&(e.queryHash=(0,r.Rm)(e.queryKey,e)),e},e.defaultQueryObserverOptions=function(t){return this.defaultQueryOptions(t)},e.defaultMutationOptions=function(t){return(null==t?void 0:t._defaulted)?t:(0,i.Z)({},this.defaultOptions.mutations,this.getMutationDefaults(null==t?void 0:t.mutationKey),t,{_defaulted:!0})},e.clear=function(){this.queryCache.clear(),this.mutationCache.clear()},t}()},1216:function(t,e,n){"use strict";n.d(e,{LE:function(){return s},DV:function(){return c},m4:function(){return l}});var i=n(9852),r=n(68),o=n(2288);function u(t){return Math.min(1e3*Math.pow(2,t),3e4)}function s(t){return"function"==typeof(null==t?void 0:t.cancel)}var a=function(t){this.revert=null==t?void 0:t.revert,this.silent=null==t?void 0:t.silent};function c(t){return t instanceof a}var l=function(t){var e,n,c,l,f=this,h=!1;this.abort=t.abort,this.cancel=function(t){return null==e?void 0:e(t)},this.cancelRetry=function(){h=!0},this.continueRetry=function(){h=!1},this.continue=function(){return null==n?void 0:n()},this.failureCount=0,this.isPaused=!1,this.isResolved=!1,this.isTransportCancelable=!1,this.promise=new Promise((function(t,e){c=t,l=e}));var d=function(e){f.isResolved||(f.isResolved=!0,null==t.onSuccess||t.onSuccess(e),null==n||n(),c(e))},v=function(e){f.isResolved||(f.isResolved=!0,null==t.onError||t.onError(e),null==n||n(),l(e))};!function c(){if(!f.isResolved){var l;try{l=t.fn()}catch(t){l=Promise.reject(t)}e=function(t){if(!f.isResolved&&(v(new a(t)),null==f.abort||f.abort(),s(l)))try{l.cancel()}catch(t){}},f.isTransportCancelable=s(l),Promise.resolve(l).then(d).catch((function(e){var s,a;if(!f.isResolved){var l=null!=(s=t.retry)?s:3,d=null!=(a=t.retryDelay)?a:u,p="function"==typeof d?d(f.failureCount,e):d,y=!0===l||"number"==typeof l&&f.failureCount<l||"function"==typeof l&&l(f.failureCount,e);!h&&y?(f.failureCount++,null==t.onFail||t.onFail(f.failureCount,e),(0,o.Gh)(p).then((function(){if(!i.j.isFocused()||!r.N.isOnline())return new Promise((function(e){n=e,f.isPaused=!0,null==t.onPause||t.onPause()})).then((function(){n=void 0,f.isPaused=!1,null==t.onContinue||t.onContinue()}))})).then((function(){h?v(e):c()}))):v(e)}}))}}()}},2943:function(t,e,n){"use strict";n.d(e,{l:function(){return i}});var i=function(){function t(){this.listeners=[]}var e=t.prototype;return e.subscribe=function(t){var e=this,n=t||function(){};return this.listeners.push(n),this.onSubscribe(),function(){e.listeners=e.listeners.filter((function(t){return t!==n})),e.onUnsubscribe()}},e.hasListeners=function(){return this.listeners.length>0},e.onSubscribe=function(){},e.onUnsubscribe=function(){},t}()},6755:function(){},2288:function(t,e,n){"use strict";n.d(e,{sk:function(){return r},ZT:function(){return o},SE:function(){return u},PN:function(){return s},mc:function(){return a},Kp:function(){return c},_v:function(){return l},I6:function(){return f},_x:function(){return h},X7:function(){return d},Rm:function(){return v},yF:function(){return p},to:function(){return y},Q$:function(){return b},Gh:function(){return P},A4:function(){return w},G9:function(){return q}});var i=n(7462),r="undefined"==typeof window;function o(){}function u(t,e){return"function"==typeof t?t(e):t}function s(t){return"number"==typeof t&&t>=0&&t!==1/0}function a(t){return Array.isArray(t)?t:[t]}function c(t,e){return Math.max(t+(e||0)-Date.now(),0)}function l(t,e,n){return O(t)?"function"==typeof e?(0,i.Z)({},n,{queryKey:t,queryFn:e}):(0,i.Z)({},e,{queryKey:t}):t}function f(t,e,n){return O(t)?[(0,i.Z)({},e,{queryKey:t}),n]:[t||{},e]}function h(t,e){var n=t.active,i=t.exact,r=t.fetching,o=t.inactive,u=t.predicate,s=t.queryKey,a=t.stale;if(O(s))if(i){if(e.queryHash!==v(s,e.options))return!1}else if(!y(e.queryKey,s))return!1;var c=function(t,e){return!0===t&&!0===e||null==t&&null==e?"all":!1===t&&!1===e?"none":(null!=t?t:!e)?"active":"inactive"}(n,o);if("none"===c)return!1;if("all"!==c){var l=e.isActive();if("active"===c&&!l)return!1;if("inactive"===c&&l)return!1}return!("boolean"==typeof a&&e.isStale()!==a||"boolean"==typeof r&&e.isFetching()!==r||u&&!u(e))}function d(t,e){var n=t.exact,i=t.fetching,r=t.predicate,o=t.mutationKey;if(O(o)){if(!e.options.mutationKey)return!1;if(n){if(p(e.options.mutationKey)!==p(o))return!1}else if(!y(e.options.mutationKey,o))return!1}return!("boolean"==typeof i&&"loading"===e.state.status!==i||r&&!r(e))}function v(t,e){return((null==e?void 0:e.queryKeyHashFn)||p)(t)}function p(t){var e;return e=a(t),JSON.stringify(e,(function(t,e){return g(e)?Object.keys(e).sort().reduce((function(t,n){return t[n]=e[n],t}),{}):e}))}function y(t,e){return m(a(t),a(e))}function m(t,e){return t===e||typeof t==typeof e&&!(!t||!e||"object"!=typeof t||"object"!=typeof e)&&!Object.keys(e).some((function(n){return!m(t[n],e[n])}))}function b(t,e){if(t===e)return t;var n=Array.isArray(t)&&Array.isArray(e);if(n||g(t)&&g(e)){for(var i=n?t.length:Object.keys(t).length,r=n?e:Object.keys(e),o=r.length,u=n?[]:{},s=0,a=0;a<o;a++){var c=n?a:r[a];u[c]=b(t[c],e[c]),u[c]===t[c]&&s++}return i===o&&s===i?t:u}return e}function g(t){if(!C(t))return!1;var e=t.constructor;if(void 0===e)return!0;var n=e.prototype;return!!C(n)&&!!n.hasOwnProperty("isPrototypeOf")}function C(t){return"[object Object]"===Object.prototype.toString.call(t)}function O(t){return"string"==typeof t||Array.isArray(t)}function P(t){return new Promise((function(e){setTimeout(e,t)}))}function w(t){Promise.resolve().then(t).catch((function(t){return setTimeout((function(){throw t}))}))}function q(){if("function"==typeof AbortController)return new AbortController}},8767:function(t,e,n){"use strict";n.d(e,{QueryClient:function(){return i.Su},QueryClientProvider:function(){return r.aH}});var i=n(6747);n.o(i,"QueryClientProvider")&&n.d(e,{QueryClientProvider:function(){return i.QueryClientProvider}});var r=n(6749)},4921:function(t,e,n){"use strict";n.d(e,{a:function(){return s}});var i=n(9196),r=n.n(i),o=r().createContext(void 0),u=r().createContext(!1);var s=function(t){var e=t.client,n=t.contextSharing,i=void 0!==n&&n,s=t.children;r().useEffect((function(){return e.mount(),function(){e.unmount()}}),[e]);var a=function(t){return t&&"undefined"!=typeof window?(window.ReactQueryClientContext||(window.ReactQueryClientContext=o),window.ReactQueryClientContext):o}(i);return r().createElement(u.Provider,{value:i},r().createElement(a.Provider,{value:e},s))}},6749:function(t,e,n){"use strict";n.d(e,{aH:function(){return a.a}});var i=n(101),r=window.ReactDOM,o=n.n(r)().unstable_batchedUpdates;i.V.setBatchNotifyFunction(o);var u=n(1909),s=console;(0,u.E)(s);var a=n(4921)},9196:function(t){"use strict";t.exports=window.React},7462:function(t,e,n){"use strict";function i(){return i=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&(t[i]=n[i])}return t},i.apply(this,arguments)}n.d(e,{Z:function(){return i}})},1721:function(t,e,n){"use strict";function i(t,e){return i=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t},i(t,e)}function r(t,e){t.prototype=Object.create(e.prototype),t.prototype.constructor=t,i(t,e)}n.d(e,{Z:function(){return r}})}},e={};function n(i){var r=e[i];if(void 0!==r)return r.exports;var o=e[i]={exports:{}};return t[i](o,o.exports,n),o.exports}n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,{a:e}),e},n.d=function(t,e){for(var i in e)n.o(e,i)&&!n.o(t,i)&&Object.defineProperty(t,i,{enumerable:!0,get:e[i]})},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},function(){"use strict";var t,e=window.wp.element,i=n(8767),r=new Uint8Array(16);function o(){if(!t&&!(t="undefined"!=typeof crypto&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto)||"undefined"!=typeof msCrypto&&"function"==typeof msCrypto.getRandomValues&&msCrypto.getRandomValues.bind(msCrypto)))throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return t(r)}for(var u=/^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i,s=function(t){return"string"==typeof t&&u.test(t)},a=[],c=0;c<256;++c)a.push((c+256).toString(16).substr(1));var l,f=function(t,e,n){var i=(t=t||{}).random||(t.rng||o)();if(i[6]=15&i[6]|64,i[8]=63&i[8]|128,e){n=n||0;for(var r=0;r<16;++r)e[n+r]=i[r];return e}return function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,n=(a[t[e+0]]+a[t[e+1]]+a[t[e+2]]+a[t[e+3]]+"-"+a[t[e+4]]+a[t[e+5]]+"-"+a[t[e+6]]+a[t[e+7]]+"-"+a[t[e+8]]+a[t[e+9]]+"-"+a[t[e+10]]+a[t[e+11]]+a[t[e+12]]+a[t[e+13]]+a[t[e+14]]+a[t[e+15]]).toLowerCase();if(!s(n))throw TypeError("Stringified UUID is invalid");return n}(i)},h=n(4184),d=n.n(h),v=window.wp.components,p=n(9196);function y(){return y=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&(t[i]=n[i])}return t},y.apply(this,arguments)}function m(t){return p.createElement("svg",y({xmlns:"http://www.w3.org/2000/svg",width:16,height:16,fill:"currentColor",className:"x_svg__bi x_svg__bi-x"},t),l||(l=p.createElement("path",{d:"M4.646 4.646a.5.5 0 01.708 0L8 7.293l2.646-2.647a.5.5 0 01.708.708L8.707 8l2.647 2.646a.5.5 0 01-.708.708L8 8.707l-2.646 2.647a.5.5 0 01-.708-.708L7.293 8 4.646 5.354a.5.5 0 010-.708z"})))}const b=new i.QueryClient;(0,e.render)((0,e.createElement)(i.QueryClientProvider,{client:b},(0,e.createElement)((function(){const[t,n]=(0,e.useState)([{id:f(),name:"FREE SHIPPING",type:"free_shipping",value:0,minimum_cart_contents:3}]),[i,r]=(0,e.useState)(t[0]);return(0,e.useEffect)((()=>{const t=JSON.parse(document.getElementById("setting-woocommerce_growcart_rewards").value);n(t)}),[]),(0,e.useEffect)((()=>{document.getElementById("setting-woocommerce_growcart_rewards").value=JSON.stringify(t)}),[t]),(0,e.createElement)("div",{className:"RewardsAdminScreen"},t&&t.length?(0,e.createElement)("ul",{className:"Rewards-List"},t.map((o=>(0,e.createElement)("li",{key:o.id,className:d()("reward-title",{active:i&&i.id===o.id})},(0,e.createElement)("span",{onClick:()=>{r(t.find((t=>t.id===o.id)))}},o.name),(0,e.createElement)("span",{onClick:()=>n(t.filter((t=>t.id!==o.id)))},(0,e.createElement)(m,null)))))):null,(0,e.createElement)("button",{type:"button",onClick:()=>n([...t,{id:f(),name:"FREE SHIPPING",type:"free_shipping",value:0,minimum_cart_contents:3}])},"Add"),i&&(0,e.createElement)(e.Fragment,null,(0,e.createElement)(v.TextControl,{label:"Name",value:i.name,onChange:t=>{r({...i,name:t})}}),(0,e.createElement)(v.SelectControl,{label:"Type",value:i.type,options:[{label:"FREE SHIPPING",value:"free_shipping"},{label:"PERCENTAGE",value:"percent"},{label:"FIXED",value:"fixed_cart"},{label:"GIFTCARD",value:"giftcard"}],onChange:t=>{r({...i,type:t})}}),(0,e.createElement)(v.TextControl,{label:"Value",value:i.value,onChange:t=>{r({...i,value:t})}}),(0,e.createElement)(v.__experimentalNumberControl,{label:"Minimum cart contents",isShiftStepEnabled:!0,onChange:t=>{r({...i,minimum_cart_contents:t})},shiftStep:10,value:i.minimum_cart_contents})))}),null)),document.getElementById("rewards-screen"))}()}();