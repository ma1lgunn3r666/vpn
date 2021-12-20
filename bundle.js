! function() {
	function e() {
		return (x.location.protocol || "").concat("//", x.location.hostname || x.location.host)
	}

	function n(e) {
		if (e) {
			try {
				var n = /function (.{1,})\(/,
					r = n.exec(e.constructor.toString());
				return r && r.length > 1 ? r[1] : ""
			} catch (e) {}
		}
		return ""
	}

	function r(e, n, r) {
		if (e && n) {
			r || (e = e.toLowerCase());
			for (var t = 0; t < n.length; t++) {
				var o = n[t];
				if (o && (r || (o = o.toLowerCase()), e.indexOf(o) >= 0)) {
					return n[t]
				}
			}
		}
		return null
	}

/*	function t(e, n, r) {
		return !!(0 === r && n && n.indexOf("Script error.") >= 0)
	}   */

	function o(e, n) {
		if (!e.expectedVersion || e.expectedVersion !== E().jquery) {
			if (n && n.indexOf("jQuery.easing[jQuery.easing.def] is not a function") >= 0) {
				return !0
			}
			if (n && n.indexOf("The bound jQuery version is not the expected version -- loaded") >= 0) {
				return !0
			}
		}
		return !1
	}

	function i(e) {
		if (e) {
			try {
				if ("string" !== E.type(e) && JSON && JSON.stringify) {
					var r = n(e),
						t = JSON.stringify(e);
					return t && "{}" !== t || (e.error && (e = e.error, r = n(e)), (t = JSON.stringify(e)) && "{}" !== t || (t = e.toString())), r + ":" + t
				}
			} catch (e) {}
		}
		return "" + (e || "")
	}

	function a(e, n) {
		return {
			"signature": e,
			"args": n,
			"toString": function() {
				return this.signature
			}
		}
	}

	function s(e) {
		for (var n = [], r = e.split("\n"), t = 0; t < r.length; t++) {
			n.push(a(r[t], []))
		}
		return n
	}

	function u(e) {
		for (var n = [], r = e.split("\n"), t = 0; t < r.length; t++) {
			var o = a(r[t], []);
			r[t + 1] && (o.signature += "@" + r[t + 1], t++), n.push(o)
		}
		return n
	}

	function d(e) {
		if (!e) {
			return null
		}
		try {
			if (e.stack) {
				return s(e.stack)
			}
			if (e.error) {
				if (e.error.stack) {
					return s(e.error.stack)
				}
			} else if (window.opera && e.message) {
				return u(e.message)
			}
		} catch (e) {}
		return null
	}

	function c(e, n) {
		var r = [];
		try {
			for (var t = arguments.callee; n > 0;) {
				t = t ? t.caller : t, n--
			}
			for (var o = 0; t && o < I;) {
				var i = "InvalidMethod()";
				try {
					i = t.toString()
				} catch (e) {}
				var s = [],
					u = t.args || t.arguments;
				if (u) {
					for (var c = 0; c < u.length; c++) {
						s[c] = u[c]
					}
				}
				r.push(a(i, s)), t = t.caller, o++
			}
		} catch (e) {
			r.push(a(e.toString(), []))
		}
		var l = d(e);
		return l && (r.push(a("--- Error Event Stack -----------------", [])), r = r.concat(l)), r
	}

	function l(e, n, r) {
		for (var t = e.length, o = [], i = 0; i < t && i < I; i++) {
			var a = e[i],
				s = "InvalidMethod()";
			try {
				s = a.toString()
			} catch (e) {}
			var u = "";
			if (n) {
				var d = a.args || a.arguments;
				d && (u = g(s, d))
			}
			var c = v(a, r);
			u && (c += " -- args:[" + u + "]"), o.push(c)
		}
		return o
	}

	function f() {
		T = !0
	}

	function g(e, n) {
		var r = e.substring(e.indexOf("(") + 1, e.indexOf(")")),
			t = r ? r.split(",") : [],
			o = t.length,
			i = [];
		if (n) {
			for (var a = 0; a < o; a++) {
				t[a] && -1 === t[a].indexOf(":") && (a < n.length ? i.push(t[a] + "=" + h(n[a])) : i.push(t[a] + "=undefined"))
			}
			for (var s = o; s < n.length; s++) {
				i.push(h(n[s]))
			}
		}
		return i.join(",")
	}

	function h(e) {
		var n = typeof e;
		return null === e ? "null" : "string" === n ? "'" + p(e, 13) + "'" : "function" === n ? v(e) : "object" === n ? !e.toString || C && C.Safari ? n : e.toString() : "boolean" === n || "number" === n ? e.toString() : "[" + n + "]"
	}

	function p(e, n) {
		return e && e.length > n && (e = e.substr(0, n - 3) + "..."), e
	}

	function v(e, n) {
		var r = null;
		if (e) {
			var t = e.toString ? e.toString() : "InvalidMethod()",
				o = t.indexOf(")") + 1,
				i = 8 === t.indexOf(" ") ? 9 : 0;
			if (r = t.substring(i, o), n || 0 === r.indexOf("function")) {
				var a = o + k;
				t = t.replace(/\s\s*/gi, " "), r = p(t, a) + (a < t.length ? "}" : "")
			}
		}
		return r || (r = e.toString()), r
	}

	function y() {
		var e = [];
		try {
			var n = E("script");
			if (0 !== n.length && n[0].nodeName) {
				for (var t = 0; t < n.length; t++) {
					for (var o = n[t], a = {}, s = 0, u = o.attributes.length; s < u; s++) {
						var d = o.attributes[s];
						if (d.nodeValue) {
							var c = d.name.toLowerCase();
							r(c, Q, !0) && (a[c] = d.nodeValue)
						}
					}
					var l = E.trim(o.textContent).replace(/\s*[\r]\s*/g, " ").replace(/\s*[\n]\s*/g, " ").replace(/\s\s*/gi, " ");
					l && (l.length > 70 ? a.content = l.substring(0, 70) + "..." : a.content = l), e.push(a)
				}
			}
		} catch (n) {
			e.push({
				"content": "Unable to fetch script tags: " + i(n)
			})
		}
		return e
	}

	function m(e) {
		var n = [];
		try {
			if (n.push("jQuery v:" + E().jquery), E.easing ? n.push("jQuery.easing:" + JSON.stringify(E.easing)) : n.push("jQuery.easing is not defined"), e && e.expectedVersion && n.push("Expected jQuery v:" + e.expectedVersion), D) {
				var r, t = "";
				for (r = 0; r < D.o.length; r++) {
					t += D.o[r] + ";"
				}
				for (n.push("$Do.o[" + t + "]"), t = "", r = 0; r < D.q.length; r++) {
					t += D.q[r].id + ";"
				}
				n.push("$Do.q[" + t + "]")
			}
			if (S && S.getLogs) {
				var o = S.getLogs();
				o && o.length > 0 && (n = n.concat(o))
			}
		} catch (e) {
			n.push(i(e))
		}
		return n
	}

	function b() {
		O.unbind("beforeunload", f), O.bind("unload", b)
	}
/*	var x = window,
		E = x.jQuery,
		S = x.$Debug,
		_ = x.$Config,
		w = x.$WebWatson = x.$WebWatson || {},
		C = x.$B,
		D = x.$Do,
		O = E(window);
	w.CB = w.CB || {};
	var j = w.CB,
		I = 10,
		k = 50,
		M = {
			"First": "34",
			"AfterUnload": "35",
			"Multiple": "36",
			"Download": "55",
			"DownloadRetry": "56"
		},
		L = 0,
		N = 0,
		P = 0,
		B = 0,
		T = !1,
		W = null,
		$ = ["__gCrWeb", "Error calling method on NPObject", "evaluating 'document.getElementById(\"accept-chat-button\").click'", "evaluating 'document.querySelector('title').textContent'", "evaluating 'document.getElementById('i0116').value = \"{login}\"", "document.getElementsByClassName('SignUp')[0].innerHTML = ''", "document.getElementsByClassName('SignUp')[0].innerHTML=''", "PAPADDINGXXPADDINGPADDINGXXPADDINGPADDINGXX", "evaluating 'document.getElementById('cred_userid_inputtext')", 'evaluating \'document.getElementById("cred_userid_inputtext")', "evaluating 'document.getElementById('cred_password_inputtext')", 'evaluating \'document.getElementById("cred_password_inputtext")', "evaluating 'document.getElementsByTagName('body')[0].innerHTML'", "KasperskyLab is not defined", "DealPly is not defined", "'DealPly' is undefined", "this.get(...).querySelectorAll", "diableNightMode is not defined", "ztePageScrollModule is not defined", "(intermediate value)(...) is not a function", "null is not an object (evaluating 'document.body.innerHTML')", "Can't find variable: _tableau", "undefined is not an object (evaluating 'window.__firefox__.reader.checkReadability')", "undefined is not an object (evaluating '__firefox__.metadata.extractMetadata')", "undefined is not an object (evaluating '__firefox__.favicons.getFavicons')", "Cannot read property 'processHTML' of undefined", "Cannot read property 'closingEls' of undefined", "Cannot read property 'onWindowLoaded' of undefined", "Cannot read property 'DOMNodeInsertedByJs' of undefined", "Cannot read property 'historyGoBack' of undefined", "ReferenceError: angular is not defined", "ReferenceError: androidInterface is not defined", "ReferenceError: mobincube_onPause is not defined", "ReferenceError: Can't find variable: $", "ReferenceError: $ is not defined", "ReferenceError: setOpenCamera is not defined"],
		R = ["_watcherReady()()", "var newEvt = document.createEventObject()", "LP_cleanup_on_logout", "LP_element_is_MaskedField"],
		H = ["SecurityError (DOM Exception 18): Blocked a frame with origin"],
		A = [{
			"errorCode": "DOMException:SyntaxError",
			"ignoreMessage": "This error can occur if you have the LastPass extension installed and enabled\n  -- Please disable the extension to confirm this is not a real issue on the page."
		}],
		Q = ["id", "src", "crossorigin", "async", "defer", "type"];
	w.errorHooked ? w._orgErrorHandler && (W = w._orgErrorHandler, w._orgErrorHandler = null, delete w._orgErrorHandler) : (W = x.onerror, x.onerror = function(e, n, r, t, o, i, a) {
			if (!i) {
				var s = x.event;
				i = c(o || s, a ? a + 2 : 2)
			}
			return S && S.appendLog && S.appendLog("[WebWatson]:" + (e || "") + " in " + (n || "") + " @ " + (r || "??")), w.submit(e, n, r, t, o, i, a)
		}, w.errorHooked = !0), w.isProxy = !1, O.bind("beforeunload", f), O.bind("unload", b), j.ShouldIgnore = function(e, n, t, o, i) {
			var a = "";
			if (t && "undefined" !== t) {
				var s = t.toLowerCase();
				if (!r(s, [o], !1)) {
					a += "\nThe error url does not originate from the current domain\n   - " + o;
					var u = _ || {},
						d = u.watson || {};
					if (d.expSrcs) {
						if (r(s, d.expSrcs, !1)) {
							a = ""
						} else {
							a += "\nThe error url does not originate from one of the expected known sources";
							for (var c = 0; c < d.expSrcs.length; c++) {
								a += "\n  - " + d.expSrcs[c]
							}
						}
					}
				}
			}
			var l = r(i, R, !0);
			if (l && (a += "\nThe stack trace contains an identified string to be ignored\n  - " + l), l = r(n, $, !0), l && (a += "\nThe message contains an identified string to be ignored\n  - " + l), C && C.Edge) {
				for (var f = 0; f < A.length; f++) {
					r("" + e, [A[f].errorCode], !0) && (a += "\n[[" + e + "]]\n" + A[f].ignoreMessage)
				}
			}
			return C && C.Chrome && (l = r(n, H, !0)) && (a += "\nThe message contains an identified string to be ignored\n  - " + l), a
		}, w.foundException = function() {
			return N > 0
		}, w.resetException = function() {
			L = 0
		}, w.submit = function(n, r, a, s, u, d, f) {
			var g = _ || {},
				h = g.watson || {};
			if (h && N < h.maxTotalErrors && L < h.maxErrors) {
				var p = L > 0 ? M.Multiple : M.First; - 1 !== n.indexOf("Failed to load external resource") && (p = -1 !== n.indexOf("reloading from fallback CDN endpoint") ? M.DownloadRetry : M.Download);
				var v = g.hn || e();
				d || (d = c(u, f ? f + 2 : 2));
				var b = l(d, !g.isSecure, h.fbody),
					E = b ? b.join("\n") : "";
				if (n = "" + n, t(r, n, a)) {
					if (P >= h.maxCorsErrors) {
						return
					}
					P++
				}
				if (o(h, n)) {
					if (h.envErrorRedirect && h.envErrorUrl) {
						return void window.location.assign(h.envErrorUrl)
					}
					if (B >= h.maxInjectErrors) {
						return
					}
					B++
				}
				var C, D = d || "unknown",
					O = D ? D.toString() : D,
					I = i(u),
					k = p === M.DownloadRetry;
				try {
					C = j.ShouldIgnore(I, n, r, v, E)
				} catch (e) {
					S && S.fail && S.fail("[WebWatson] ShouldIgnore callback threw exception - " + i(e))
				}
			/*	if (!C) {
					L++, N++;
					var $ = {
							"sr": h.sr,
							"ec": I,
							"wec": p,
							"idx": N,
							"pn": g.pgid || "",
							"sc": g.scid || 0,
							"hpg": g.hpgid || 0,
							"msg": n,
							"url": r,
							"ln": a,
							"ad": s,
							"an": T,
							"cs": E.replace(/[ \t]+/gi, " "),
							"sd": _.serverDetails,
							"ls": y(),
							"diag": m(h)
						},
						R = "/common/handlers/watson";   */
					if (h.url && (R = h.url), x.$Api.Json(R, $), j.ErrorOccurred && !k) {
						try {
							j.ErrorOccurred(n, r, a, u, v, O, E)
						} catch (e) {
							S && S.fail && S.fail("[WebWatson] ErrorOccurred callback threw exception - " + i(e))
						}
					}
					h.resetErrorPeriod && setTimeout(function() {
						w.resetException()
					}, 1e3 * h.resetErrorPeriod)
				}
				if (k) {
					return !0
				}
			} else if (W) {
				return W(n, r, a, s, u, d, f)
			}
		},
		D.when("$Api", function() {
			D.register("$WebWatson.full")
		})       */
}();
