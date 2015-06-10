if (!window.console) {
	window.console = {};
	window.console.log = function(a) {
	};
	window.console.dir = function(a) {
	}
}
if (!Array.indexOf) {
	Array.prototype.indexOf = function(b) {
		for ( var a = 0; a < this.length; a++) {
			if (this[a] == b) {
				return a
			}
		}
		return -1
	}
}
(function() {
	this.canvg = function(j, m, b) {
		if (j == null && m == null && b == null) {
			var e = document.getElementsByTagName("svg");
			for ( var g = 0; g < e.length; g++) {
				var f = e[g];
				var k = document.createElement("canvas");
				k.width = f.clientWidth;
				k.height = f.clientHeight;
				f.parentNode.insertBefore(k, f);
				f.parentNode.removeChild(f);
				var d = document.createElement("div");
				d.appendChild(f);
				canvg(k, d.innerHTML)
			}
			return
		}
		if (typeof j == "string") {
			j = document.getElementById(j)
		}
		var h;
		if (j.svg == null) {
			h = a();
			j.svg = h
		} else {
			h = j.svg;
			h.stop()
		}
		h.opts = b;
		var l = j.getContext("2d");
		if (m.substr(0, 1) == "<") {
			h.loadXml(l, m)
		} else {
			h.load(l, m)
		}
	};
	function a() {
		var b = {};
		b.FRAMERATE = 30;
		b.init = function(c) {
			b.Definitions = {};
			b.Styles = {};
			b.Animations = [];
			b.Images = [];
			b.ctx = c;
			b.ViewPort = new (function() {
				this.viewPorts = [];
				this.SetCurrent = function(e, d) {
					this.viewPorts.push({
						width : e,
						height : d
					})
				};
				this.RemoveCurrent = function() {
					this.viewPorts.pop()
				};
				this.Current = function() {
					return this.viewPorts[this.viewPorts.length - 1]
				};
				this.width = function() {
					return this.Current().width
				};
				this.height = function() {
					return this.Current().height
				};
				this.ComputeSize = function(e) {
					if (e != null && typeof (e) == "number") {
						return e
					}
					if (e == "x") {
						return this.width()
					}
					if (e == "y") {
						return this.height()
					}
					return Math.sqrt(Math.pow(this.width(), 2)
							+ Math.pow(this.height(), 2))
							/ Math.sqrt(2)
				}
			})
		};
		b.init();
		b.ImagesLoaded = function() {
			for ( var c = 0; c < b.Images.length; c++) {
				if (!b.Images[c].loaded) {
					return false
				}
			}
			return true
		};
		b.trim = function(c) {
			return c.replace(/^\s+|\s+$/g, "")
		};
		b.compressSpaces = function(c) {
			return c.replace(/[\s\r\t\n]+/gm, " ")
		};
		b.ajax = function(d) {
			var c;
			if (window.XMLHttpRequest) {
				c = new XMLHttpRequest()
			} else {
				c = new ActiveXObject("Microsoft.XMLHTTP")
			}
			if (c) {
				c.open("GET", d, false);
				c.send(null);
				return c.responseText
			}
			return null
		};
		b.parseXml = function(c) {
			if (window.DOMParser) {
				var e = new DOMParser();
				return e.parseFromString(c, "text/xml")
			} else {
				c = c.replace(/<!DOCTYPE svg[^>]*>/, "");
				var d = new ActiveXObject("Microsoft.XMLDOM");
				d.async = "false";
				d.loadXML(c);
				return d
			}
		};
		b.Property = function(c, e) {
			this.name = c;
			this.value = e;
			this.hasValue = function() {
				return (this.value != null && this.value != "")
			};
			this.numValue = function() {
				if (!this.hasValue()) {
					return 0
				}
				var f = parseFloat(this.value);
				if ((this.value + "").match(/%$/)) {
					f = f / 100
				}
				return f
			};
			this.valueOrDefault = function(f) {
				if (this.hasValue()) {
					return this.value
				}
				return f
			};
			this.numValueOrDefault = function(f) {
				if (this.hasValue()) {
					return this.numValue()
				}
				return f
			};
			var d = this;
			this.Color = {
				addOpacity : function(g) {
					var h = d.value;
					if (g != null && g != "") {
						var f = new RGBColor(d.value);
						if (f.ok) {
							h = "rgba(" + f.r + ", " + f.g + ", " + f.b + ", "
									+ g + ")"
						}
					}
					return new b.Property(d.name, h)
				}
			};
			this.Definition = {
				getDefinition : function() {
					var f = d.value.replace(/^(url\()?#([^\)]+)\)?$/, "$2");
					return b.Definitions[f]
				},
				isUrl : function() {
					return d.value.indexOf("url(") == 0
				},
				getFillStyle : function(g) {
					var f = this.getDefinition();
					if (f != null && f.createGradient) {
						return f.createGradient(b.ctx, g)
					}
					if (f != null && f.createPattern) {
						return f.createPattern(b.ctx, g)
					}
					return null
				}
			};
			this.Length = {
				DPI : function(f) {
					return 96
				},
				EM : function(h) {
					var f = 12;
					var g = new b.Property("fontSize",
							b.Font.Parse(b.ctx.font).fontSize);
					if (g.hasValue()) {
						f = g.Length.toPixels(h)
					}
					return f
				},
				toPixels : function(g) {
					if (!d.hasValue()) {
						return 0
					}
					var f = d.value + "";
					if (f.match(/em$/)) {
						return d.numValue() * this.EM(g)
					}
					if (f.match(/ex$/)) {
						return d.numValue() * this.EM(g) / 2
					}
					if (f.match(/px$/)) {
						return d.numValue()
					}
					if (f.match(/pt$/)) {
						return d.numValue() * 1.25
					}
					if (f.match(/pc$/)) {
						return d.numValue() * 15
					}
					if (f.match(/cm$/)) {
						return d.numValue() * this.DPI(g) / 2.54
					}
					if (f.match(/mm$/)) {
						return d.numValue() * this.DPI(g) / 25.4
					}
					if (f.match(/in$/)) {
						return d.numValue() * this.DPI(g)
					}
					if (f.match(/%$/)) {
						return d.numValue() * b.ViewPort.ComputeSize(g)
					}
					return d.numValue()
				}
			};
			this.Time = {
				toMilliseconds : function() {
					if (!d.hasValue()) {
						return 0
					}
					var f = d.value + "";
					if (f.match(/s$/)) {
						return d.numValue() * 1000
					}
					if (f.match(/ms$/)) {
						return d.numValue()
					}
					return d.numValue()
				}
			};
			this.Angle = {
				toRadians : function() {
					if (!d.hasValue()) {
						return 0
					}
					var f = d.value + "";
					if (f.match(/deg$/)) {
						return d.numValue() * (Math.PI / 180)
					}
					if (f.match(/grad$/)) {
						return d.numValue() * (Math.PI / 200)
					}
					if (f.match(/rad$/)) {
						return d.numValue()
					}
					return d.numValue() * (Math.PI / 180)
				}
			}
		};
		b.Font = new (function() {
			this.Styles = [ "normal", "italic", "oblique", "inherit" ];
			this.Variants = [ "normal", "small-caps", "inherit" ];
			this.Weights = [ "normal", "bold", "bolder", "lighter", "100",
					"200", "300", "400", "500", "600", "700", "800", "900",
					"inherit" ];
			this.CreateFont = function(l, h, e, k, d, g) {
				var j = g != null ? this.Parse(g) : this.CreateFont("", "", "",
						"", "", b.ctx.font);
				return {
					fontFamily : d || j.fontFamily,
					fontSize : k || j.fontSize,
					fontStyle : l || j.fontStyle,
					fontWeight : e || j.fontWeight,
					fontVariant : h || j.fontVariant,
					toString : function() {
						return [ this.fontStyle, this.fontVariant,
								this.fontWeight, this.fontSize, this.fontFamily ]
								.join(" ")
					}
				}
			};
			var c = this;
			this.Parse = function(h) {
				var j = {};
				var k = b.trim(b.compressSpaces(h || "")).split(" ");
				var l = {
					fontSize : false,
					fontStyle : false,
					fontWeight : false,
					fontVariant : false
				};
				var e = "";
				for ( var g = 0; g < k.length; g++) {
					if (!l.fontStyle && c.Styles.indexOf(k[g]) != -1) {
						if (k[g] != "inherit") {
							j.fontStyle = k[g]
						}
						l.fontStyle = true
					} else {
						if (!l.fontVariant && c.Variants.indexOf(k[g]) != -1) {
							if (k[g] != "inherit") {
								j.fontVariant = k[g]
							}
							l.fontStyle = l.fontVariant = true
						} else {
							if (!l.fontWeight && c.Weights.indexOf(k[g]) != -1) {
								if (k[g] != "inherit") {
									j.fontWeight = k[g]
								}
								l.fontStyle = l.fontVariant = l.fontWeight = true
							} else {
								if (!l.fontSize) {
									if (k[g] != "inherit") {
										j.fontSize = k[g].split("/")[0]
									}
									l.fontStyle = l.fontVariant = l.fontWeight = l.fontSize = true
								} else {
									if (k[g] != "inherit") {
										e += k[g]
									}
								}
							}
						}
					}
				}
				if (e != "") {
					j.fontFamily = e
				}
				return j
			}
		});
		b.ToNumberArray = function(e) {
			var c = b.trim(b.compressSpaces((e || "").replace(/,/g, " ")))
					.split(" ");
			for ( var d = 0; d < c.length; d++) {
				c[d] = parseFloat(c[d])
			}
			return c
		};
		b.Point = function(c, d) {
			this.x = c;
			this.y = d;
			this.angleTo = function(e) {
				return Math.atan2(e.y - this.y, e.x - this.x)
			};
			this.applyTransform = function(e) {
				var f = this.x * e[0] + this.y * e[2] + e[4];
				var g = this.x * e[1] + this.y * e[3] + e[5];
				this.x = f;
				this.y = g
			}
		};
		b.CreatePoint = function(d) {
			var c = b.ToNumberArray(d);
			return new b.Point(c[0], c[1])
		};
		b.CreatePath = function(e) {
			var c = b.ToNumberArray(e);
			var f = [];
			for ( var d = 0; d < c.length; d += 2) {
				f.push(new b.Point(c[d], c[d + 1]))
			}
			return f
		};
		b.BoundingBox = function(d, f, c, e) {
			this.x1 = Number.NaN;
			this.y1 = Number.NaN;
			this.x2 = Number.NaN;
			this.y2 = Number.NaN;
			this.x = function() {
				return this.x1
			};
			this.y = function() {
				return this.y1
			};
			this.width = function() {
				return this.x2 - this.x1
			};
			this.height = function() {
				return this.y2 - this.y1
			};
			this.addPoint = function(g, h) {
				if (g != null) {
					if (isNaN(this.x1) || isNaN(this.x2)) {
						this.x1 = g;
						this.x2 = g
					}
					if (g < this.x1) {
						this.x1 = g
					}
					if (g > this.x2) {
						this.x2 = g
					}
				}
				if (h != null) {
					if (isNaN(this.y1) || isNaN(this.y2)) {
						this.y1 = h;
						this.y2 = h
					}
					if (h < this.y1) {
						this.y1 = h
					}
					if (h > this.y2) {
						this.y2 = h
					}
				}
			};
			this.addX = function(g) {
				this.addPoint(g, null)
			};
			this.addY = function(g) {
				this.addPoint(null, g)
			};
			this.addBoundingBox = function(g) {
				this.addPoint(g.x1, g.y1);
				this.addPoint(g.x2, g.y2)
			};
			this.addQuadraticCurve = function(m, l, h, g, o, n) {
				var k = m + 2 / 3 * (h - m);
				var j = l + 2 / 3 * (g - l);
				var q = k + 1 / 3 * (o - m);
				var p = j + 1 / 3 * (n - l);
				this.addBezierCurve(m, l, k, q, j, p, o, n)
			};
			this.addBezierCurve = function(v, u, l, j, q, o, x, w) {
				var m = [ v, u ], k = [ l, j ], h = [ q, o ], g = [ x, w ];
				this.addPoint(m[0], m[1]);
				this.addPoint(g[0], g[1]);
				for (i = 0; i <= 1; i++) {
					var y = function(C) {
						return Math.pow(1 - C, 3) * m[i] + 3
								* Math.pow(1 - C, 2) * C * k[i] + 3 * (1 - C)
								* Math.pow(C, 2) * h[i] + Math.pow(C, 3) * g[i]
					};
					var A = 6 * m[i] - 12 * k[i] + 6 * h[i];
					var B = -3 * m[i] + 9 * k[i] - 9 * h[i] + 3 * g[i];
					var z = 3 * k[i] - 3 * m[i];
					if (B == 0) {
						if (A == 0) {
							continue
						}
						var s = -z / A;
						if (0 < s && s < 1) {
							if (i == 0) {
								this.addX(y(s))
							}
							if (i == 1) {
								this.addY(y(s))
							}
						}
						continue
					}
					var n = Math.pow(A, 2) - 4 * z * B;
					if (n < 0) {
						continue
					}
					var r = (-A + Math.sqrt(n)) / (2 * B);
					if (0 < r && r < 1) {
						if (i == 0) {
							this.addX(y(r))
						}
						if (i == 1) {
							this.addY(y(r))
						}
					}
					var p = (-A - Math.sqrt(n)) / (2 * B);
					if (0 < p && p < 1) {
						if (i == 0) {
							this.addX(y(p))
						}
						if (i == 1) {
							this.addY(y(p))
						}
					}
				}
			};
			this.isPointInBox = function(g, h) {
				return (this.x1 <= g && g <= this.x2 && this.y1 <= h && h <= this.y2)
			};
			this.addPoint(d, f);
			this.addPoint(c, e)
		};
		b.Transform = function(c) {
			var h = this;
			this.Type = {};
			this.Type.translate = function(k) {
				this.p = b.CreatePoint(k);
				this.apply = function(l) {
					l.translate(this.p.x || 0, this.p.y || 0)
				};
				this.applyToPoint = function(l) {
					l
							.applyTransform([ 1, 0, 0, 1, this.p.x || 0,
									this.p.y || 0 ])
				}
			};
			this.Type.rotate = function(l) {
				var k = b.ToNumberArray(l);
				this.angle = new b.Property("angle", k[0]);
				this.cx = k[1] || 0;
				this.cy = k[2] || 0;
				this.apply = function(m) {
					m.translate(this.cx, this.cy);
					m.rotate(this.angle.Angle.toRadians());
					m.translate(-this.cx, -this.cy)
				};
				this.applyToPoint = function(n) {
					var m = this.angle.Angle.toRadians();
					n
							.applyTransform([ 1, 0, 0, 1, this.p.x || 0,
									this.p.y || 0 ]);
					n.applyTransform([ Math.cos(m), Math.sin(m), -Math.sin(m),
							Math.cos(m), 0, 0 ]);
					n.applyTransform([ 1, 0, 0, 1, -this.p.x || 0,
							-this.p.y || 0 ])
				}
			};
			this.Type.scale = function(k) {
				this.p = b.CreatePoint(k);
				this.apply = function(l) {
					l.scale(this.p.x || 1, this.p.y || this.p.x || 1)
				};
				this.applyToPoint = function(l) {
					l
							.applyTransform([ this.p.x || 0, 0, 0,
									this.p.y || 0, 0, 0 ])
				}
			};
			this.Type.matrix = function(k) {
				this.m = b.ToNumberArray(k);
				this.apply = function(l) {
					l.transform(this.m[0], this.m[1], this.m[2], this.m[3],
							this.m[4], this.m[5])
				};
				this.applyToPoint = function(l) {
					l.applyTransform(this.m)
				}
			};
			this.Type.SkewBase = function(k) {
				this.base = h.Type.matrix;
				this.base(k);
				this.angle = new b.Property("angle", k)
			};
			this.Type.SkewBase.prototype = new this.Type.matrix;
			this.Type.skewX = function(k) {
				this.base = h.Type.SkewBase;
				this.base(k);
				this.m = [ 1, 0, Math.tan(this.angle.Angle.toRadians()), 1, 0,
						0 ]
			};
			this.Type.skewX.prototype = new this.Type.SkewBase;
			this.Type.skewY = function(k) {
				this.base = h.Type.SkewBase;
				this.base(k);
				this.m = [ 1, Math.tan(this.angle.Angle.toRadians()), 0, 1, 0,
						0 ]
			};
			this.Type.skewY.prototype = new this.Type.SkewBase;
			this.transforms = [];
			this.apply = function(k) {
				for ( var l = 0; l < this.transforms.length; l++) {
					this.transforms[l].apply(k)
				}
			};
			this.applyToPoint = function(l) {
				for ( var k = 0; k < this.transforms.length; k++) {
					this.transforms[k].applyToPoint(l)
				}
			};
			var j = c.split(/\s(?=[a-z])/);
			for ( var e = 0; e < j.length; e++) {
				var g = j[e].split("(")[0];
				var f = j[e].split("(")[1].replace(")", "");
				var d = new this.Type[g](f);
				this.transforms.push(d)
			}
		};
		b.AspectRatio = function(s, q, d, k, r, c, g, f, p, o) {
			q = b.compressSpaces(q);
			q = q.replace(/^defer\s/, "");
			var j = q.split(" ")[0] || "xMidYMid";
			var e = q.split(" ")[1] || "meet";
			var n = d / k;
			var m = r / c;
			var h = Math.min(n, m);
			var l = Math.max(n, m);
			if (e == "meet") {
				k *= h;
				c *= h
			}
			if (e == "slice") {
				k *= l;
				c *= l
			}
			p = new b.Property("refX", p);
			o = new b.Property("refY", o);
			if (p.hasValue() && o.hasValue()) {
				s.translate(-h * p.Length.toPixels("x"), -h
						* o.Length.toPixels("y"))
			} else {
				if (j.match(/^xMid/)
						&& ((e == "meet" && h == m) || (e == "slice" && l == m))) {
					s.translate(d / 2 - k / 2, 0)
				}
				if (j.match(/YMid$/)
						&& ((e == "meet" && h == n) || (e == "slice" && l == n))) {
					s.translate(0, r / 2 - c / 2)
				}
				if (j.match(/^xMax/)
						&& ((e == "meet" && h == m) || (e == "slice" && l == m))) {
					s.translate(d - k, 0)
				}
				if (j.match(/YMax$/)
						&& ((e == "meet" && h == n) || (e == "slice" && l == n))) {
					s.translate(0, r - c)
				}
			}
			if (j == "none") {
				s.scale(n, m)
			} else {
				if (e == "meet") {
					s.scale(h, h)
				} else {
					if (e == "slice") {
						s.scale(l, l)
					}
				}
			}
			s.translate(g == null ? 0 : -g, f == null ? 0 : -f)
		};
		b.Element = {};
		b.Element.ElementBase = function(g) {
			this.attributes = {};
			this.styles = {};
			this.children = [];
			this.attribute = function(o, p) {
				var j = this.attributes[o];
				if (j != null) {
					return j
				}
				j = new b.Property(o, "");
				if (p == true) {
					this.attributes[o] = j
				}
				return j
			};
			this.style = function(o, q) {
				var p = this.styles[o];
				if (p != null) {
					return p
				}
				var j = this.attribute(o);
				if (j != null && j.hasValue()) {
					return j
				}
				p = new b.Property(o, "");
				if (q == true) {
					this.styles[o] = p
				}
				return p
			};
			this.render = function(j) {
				if (this.attribute("display").value == "none") {
					return
				}
				j.save();
				this.setContext(j);
				this.renderChildren(j);
				this.clearContext(j);
				j.restore()
			};
			this.setContext = function(j) {
			};
			this.clearContext = function(j) {
			};
			this.renderChildren = function(j) {
				for ( var o = 0; o < this.children.length; o++) {
					this.children[o].render(j)
				}
			};
			this.addChild = function(o, j) {
				var p = o;
				if (j) {
					p = b.CreateElement(o)
				}
				p.parent = this;
				this.children.push(p)
			};
			if (g != null && g.nodeType == 1) {
				for ( var l = 0; l < g.childNodes.length; l++) {
					var c = g.childNodes[l];
					if (c.nodeType == 1) {
						this.addChild(c, true)
					}
				}
				for ( var l = 0; l < g.attributes.length; l++) {
					var f = g.attributes[l];
					this.attributes[f.nodeName] = new b.Property(f.nodeName,
							f.nodeValue)
				}
				var n = b.Styles[this.type];
				if (n != null) {
					for ( var e in n) {
						this.styles[e] = n[e]
					}
				}
				if (this.attribute("class").hasValue()) {
					var h = b.compressSpaces(this.attribute("class").value)
							.split(" ");
					for ( var k = 0; k < h.length; k++) {
						n = b.Styles["." + h[k]];
						if (n != null) {
							for ( var e in n) {
								this.styles[e] = n[e]
							}
						}
					}
				}
				if (this.attribute("style").hasValue()) {
					var n = this.attribute("style").value.split(";");
					for ( var l = 0; l < n.length; l++) {
						if (b.trim(n[l]) != "") {
							var d = n[l].split(":");
							var e = b.trim(d[0]);
							var m = b.trim(d[1]);
							this.styles[e] = new b.Property(e, m)
						}
					}
				}
				if (this.attribute("id").hasValue()) {
					if (b.Definitions[this.attribute("id").value] == null) {
						b.Definitions[this.attribute("id").value] = this
					}
				}
			}
		};
		b.Element.RenderedElementBase = function(c) {
			this.base = b.Element.ElementBase;
			this.base(c);
			this.setContext = function(e) {
				if (this.style("fill").Definition.isUrl()) {
					var d = this.style("fill").Definition.getFillStyle(this);
					if (d != null) {
						e.fillStyle = d
					}
				} else {
					if (this.style("fill").hasValue()) {
						var f = this.style("fill");
						if (this.style("fill-opacity").hasValue()) {
							f = f.Color
									.addOpacity(this.style("fill-opacity").value)
						}
						e.fillStyle = (f.value == "none" ? "rgba(0,0,0,0)"
								: f.value)
					}
				}
				if (this.style("stroke").Definition.isUrl()) {
					var d = this.style("stroke").Definition.getFillStyle(this);
					if (d != null) {
						e.strokeStyle = d
					}
				} else {
					if (this.style("stroke").hasValue()) {
						var j = this.style("stroke");
						if (this.style("stroke-opacity").hasValue()) {
							j = j.Color
									.addOpacity(this.style("stroke-opacity").value)
						}
						e.strokeStyle = (j.value == "none" ? "rgba(0,0,0,0)"
								: j.value)
					}
				}
				if (this.style("stroke-width").hasValue()) {
					e.lineWidth = this.style("stroke-width").Length.toPixels()
				}
				if (this.style("stroke-linecap").hasValue()) {
					e.lineCap = this.style("stroke-linecap").value
				}
				if (this.style("stroke-linejoin").hasValue()) {
					e.lineJoin = this.style("stroke-linejoin").value
				}
				if (this.style("stroke-miterlimit").hasValue()) {
					e.miterLimit = this.style("stroke-miterlimit").value
				}
				if (typeof (e.font) != "undefined") {
					e.font = b.Font.CreateFont(
							this.style("font-style").value,
							this.style("font-variant").value,
							this.style("font-weight").value,
							this.style("font-size").hasValue() ? this
									.style("font-size").Length.toPixels()
									+ "px" : "",
							this.style("font-family").value).toString()
				}
				if (this.attribute("transform").hasValue()) {
					var g = new b.Transform(this.attribute("transform").value);
					g.apply(e)
				}
				if (this.attribute("clip-path").hasValue()) {
					var h = this.attribute("clip-path").Definition
							.getDefinition();
					if (h != null) {
						h.apply(e)
					}
				}
				if (this.style("opacity").hasValue()) {
					e.globalAlpha = this.style("opacity").numValue()
				}
			}
		};
		b.Element.RenderedElementBase.prototype = new b.Element.ElementBase;
		b.Element.PathElementBase = function(c) {
			this.base = b.Element.RenderedElementBase;
			this.base(c);
			this.path = function(d) {
				if (d != null) {
					d.beginPath()
				}
				return new b.BoundingBox()
			};
			this.renderChildren = function(e) {
				this.path(e);
				b.Mouse.checkPath(this, e);
				if (e.fillStyle != "") {
					e.fill()
				}
				if (e.strokeStyle != "") {
					e.stroke()
				}
				var g = this.getMarkers();
				if (g != null) {
					if (this.attribute("marker-start").Definition.isUrl()) {
						var d = this.attribute("marker-start").Definition
								.getDefinition();
						d.render(e, g[0][0], g[0][1])
					}
					if (this.attribute("marker-mid").Definition.isUrl()) {
						var d = this.attribute("marker-mid").Definition
								.getDefinition();
						for ( var f = 1; f < g.length - 1; f++) {
							d.render(e, g[f][0], g[f][1])
						}
					}
					if (this.attribute("marker-end").Definition.isUrl()) {
						var d = this.attribute("marker-end").Definition
								.getDefinition();
						d.render(e, g[g.length - 1][0], g[g.length - 1][1])
					}
				}
			};
			this.getBoundingBox = function() {
				return this.path()
			};
			this.getMarkers = function() {
				return null
			}
		};
		b.Element.PathElementBase.prototype = new b.Element.RenderedElementBase;
		b.Element.svg = function(c) {
			this.base = b.Element.RenderedElementBase;
			this.base(c);
			this.baseClearContext = this.clearContext;
			this.clearContext = function(d) {
				this.baseClearContext(d);
				b.ViewPort.RemoveCurrent()
			};
			this.baseSetContext = this.setContext;
			this.setContext = function(g) {
				g.strokeStyle = "rgba(0,0,0,0)";
				g.lineCap = "butt";
				g.lineJoin = "miter";
				g.miterLimit = 4;
				this.baseSetContext(g);
				if (this.attribute("x").hasValue()
						&& this.attribute("y").hasValue()) {
					g.translate(this.attribute("x").Length.toPixels("x"), this
							.attribute("y").Length.toPixels("y"))
				}
				var h = b.ViewPort.width();
				var f = b.ViewPort.height();
				if (this.attribute("width").hasValue()
						&& this.attribute("height").hasValue()) {
					h = this.attribute("width").Length.toPixels("x");
					f = this.attribute("height").Length.toPixels("y");
					var e = 0;
					var l = 0;
					if (this.attribute("refX").hasValue()
							&& this.attribute("refY").hasValue()) {
						e = -this.attribute("refX").Length.toPixels("x");
						l = -this.attribute("refY").Length.toPixels("y")
					}
					g.beginPath();
					g.moveTo(e, l);
					g.lineTo(h, l);
					g.lineTo(h, f);
					g.lineTo(e, f);
					g.closePath();
					g.clip()
				}
				b.ViewPort.SetCurrent(h, f);
				if (this.attribute("viewBox").hasValue()) {
					var j = b.ToNumberArray(this.attribute("viewBox").value);
					var d = j[0];
					var k = j[1];
					h = j[2];
					f = j[3];
					b.AspectRatio(g,
							this.attribute("preserveAspectRatio").value,
							b.ViewPort.width(), h, b.ViewPort.height(), f, d,
							k, this.attribute("refX").value, this
									.attribute("refY").value);
					b.ViewPort.RemoveCurrent();
					b.ViewPort.SetCurrent(j[2], j[3])
				}
			}
		};
		b.Element.svg.prototype = new b.Element.RenderedElementBase;
		b.Element.rect = function(c) {
			this.base = b.Element.PathElementBase;
			this.base(c);
			this.path = function(f) {
				var e = this.attribute("x").Length.toPixels("x");
				var k = this.attribute("y").Length.toPixels("y");
				var g = this.attribute("width").Length.toPixels("x");
				var d = this.attribute("height").Length.toPixels("y");
				var j = this.attribute("rx").Length.toPixels("x");
				var h = this.attribute("ry").Length.toPixels("y");
				if (this.attribute("rx").hasValue()
						&& !this.attribute("ry").hasValue()) {
					h = j
				}
				if (this.attribute("ry").hasValue()
						&& !this.attribute("rx").hasValue()) {
					j = h
				}
				if (f != null) {
					f.beginPath();
					f.moveTo(e + j, k);
					f.lineTo(e + g - j, k);
					f.quadraticCurveTo(e + g, k, e + g, k + h);
					f.lineTo(e + g, k + d - h);
					f.quadraticCurveTo(e + g, k + d, e + g - j, k + d);
					f.lineTo(e + j, k + d);
					f.quadraticCurveTo(e, k + d, e, k + d - h);
					f.lineTo(e, k + h);
					f.quadraticCurveTo(e, k, e + j, k);
					f.closePath()
				}
				return new b.BoundingBox(e, k, e + g, k + d)
			}
		};
		b.Element.rect.prototype = new b.Element.PathElementBase;
		b.Element.circle = function(c) {
			this.base = b.Element.PathElementBase;
			this.base(c);
			this.path = function(e) {
				var d = this.attribute("cx").Length.toPixels("x");
				var g = this.attribute("cy").Length.toPixels("y");
				var f = this.attribute("r").Length.toPixels();
				if (e != null) {
					e.beginPath();
					e.arc(d, g, f, 0, Math.PI * 2, true);
					e.closePath()
				}
				return new b.BoundingBox(d - f, g - f, d + f, g + f)
			}
		};
		b.Element.circle.prototype = new b.Element.PathElementBase;
		b.Element.ellipse = function(c) {
			this.base = b.Element.PathElementBase;
			this.base(c);
			this.path = function(e) {
				var g = 4 * ((Math.sqrt(2) - 1) / 3);
				var h = this.attribute("rx").Length.toPixels("x");
				var f = this.attribute("ry").Length.toPixels("y");
				var d = this.attribute("cx").Length.toPixels("x");
				var j = this.attribute("cy").Length.toPixels("y");
				if (e != null) {
					e.beginPath();
					e.moveTo(d, j - f);
					e.bezierCurveTo(d + (g * h), j - f, d + h, j - (g * f), d
							+ h, j);
					e.bezierCurveTo(d + h, j + (g * f), d + (g * h), j + f, d,
							j + f);
					e.bezierCurveTo(d - (g * h), j + f, d - h, j + (g * f), d
							- h, j);
					e.bezierCurveTo(d - h, j - (g * f), d - (g * h), j - f, d,
							j - f);
					e.closePath()
				}
				return new b.BoundingBox(d - h, j - f, d + h, j + f)
			}
		};
		b.Element.ellipse.prototype = new b.Element.PathElementBase;
		b.Element.line = function(c) {
			this.base = b.Element.PathElementBase;
			this.base(c);
			this.getPoints = function() {
				return [
						new b.Point(this.attribute("x1").Length.toPixels("x"),
								this.attribute("y1").Length.toPixels("y")),
						new b.Point(this.attribute("x2").Length.toPixels("x"),
								this.attribute("y2").Length.toPixels("y")) ]
			};
			this.path = function(d) {
				var e = this.getPoints();
				if (d != null) {
					d.beginPath();
					d.moveTo(e[0].x, e[0].y);
					d.lineTo(e[1].x, e[1].y)
				}
				return new b.BoundingBox(e[0].x, e[0].y, e[1].x, e[1].y)
			};
			this.getMarkers = function() {
				var e = this.getPoints();
				var d = e[0].angleTo(e[1]);
				return [ [ e[0], d ], [ e[1], d ] ]
			}
		};
		b.Element.line.prototype = new b.Element.PathElementBase;
		b.Element.polyline = function(c) {
			this.base = b.Element.PathElementBase;
			this.base(c);
			this.points = b.CreatePath(this.attribute("points").value);
			this.path = function(d) {
				var f = new b.BoundingBox(this.points[0].x, this.points[0].y);
				if (d != null) {
					d.beginPath();
					d.moveTo(this.points[0].x, this.points[0].y)
				}
				for ( var e = 1; e < this.points.length; e++) {
					f.addPoint(this.points[e].x, this.points[e].y);
					if (d != null) {
						d.lineTo(this.points[e].x, this.points[e].y)
					}
				}
				return f
			};
			this.getMarkers = function() {
				var e = [];
				for ( var d = 0; d < this.points.length - 1; d++) {
					e.push([ this.points[d],
							this.points[d].angleTo(this.points[d + 1]) ])
				}
				e.push([ this.points[this.points.length - 1],
						e[e.length - 1][1] ]);
				return e
			}
		};
		b.Element.polyline.prototype = new b.Element.PathElementBase;
		b.Element.polygon = function(c) {
			this.base = b.Element.polyline;
			this.base(c);
			this.basePath = this.path;
			this.path = function(d) {
				var e = this.basePath(d);
				if (d != null) {
					d.lineTo(this.points[0].x, this.points[0].y);
					d.closePath()
				}
				return e
			}
		};
		b.Element.polygon.prototype = new b.Element.polyline;
		b.Element.path = function(c) {
			this.base = b.Element.PathElementBase;
			this.base(c);
			var e = this.attribute("d").value;
			e = e.replace(/,/gm, " ");
			e = e.replace(/([MmZzLlHhVvCcSsQqTtAa])([MmZzLlHhVvCcSsQqTtAa])/gm,
					"$1 $2");
			e = e.replace(/([MmZzLlHhVvCcSsQqTtAa])([MmZzLlHhVvCcSsQqTtAa])/gm,
					"$1 $2");
			e = e.replace(/([MmZzLlHhVvCcSsQqTtAa])([^\s])/gm, "$1 $2");
			e = e.replace(/([^\s])([MmZzLlHhVvCcSsQqTtAa])/gm, "$1 $2");
			e = e.replace(/([0-9])([+\-])/gm, "$1 $2");
			e = e.replace(/(\.[0-9]*)(\.)/gm, "$1 $2");
			e = e.replace(/([Aa](\s+[0-9]+){3})\s+([01])\s*([01])/gm,
					"$1 $3 $4 ");
			e = b.compressSpaces(e);
			e = b.trim(e);
			this.PathParser = new (function(f) {
				this.tokens = f.split(" ");
				this.reset = function() {
					this.i = -1;
					this.command = "";
					this.previousCommand = "";
					this.start = new b.Point(0, 0);
					this.control = new b.Point(0, 0);
					this.current = new b.Point(0, 0);
					this.points = [];
					this.angles = []
				};
				this.isEnd = function() {
					return this.i >= this.tokens.length - 1
				};
				this.isCommandOrEnd = function() {
					if (this.isEnd()) {
						return true
					}
					return this.tokens[this.i + 1].match(/[A-Za-z]/) != null
				};
				this.isRelativeCommand = function() {
					return this.command == this.command.toLowerCase()
				};
				this.getToken = function() {
					this.i = this.i + 1;
					return this.tokens[this.i]
				};
				this.getScalar = function() {
					return parseFloat(this.getToken())
				};
				this.nextCommand = function() {
					this.previousCommand = this.command;
					this.command = this.getToken()
				};
				this.getPoint = function() {
					var d = new b.Point(this.getScalar(), this.getScalar());
					return this.makeAbsolute(d)
				};
				this.getAsControlPoint = function() {
					var d = this.getPoint();
					this.control = d;
					return d
				};
				this.getAsCurrentPoint = function() {
					var d = this.getPoint();
					this.current = d;
					return d
				};
				this.getReflectedControlPoint = function() {
					if (this.previousCommand.toLowerCase() != "c"
							&& this.previousCommand.toLowerCase() != "s") {
						return this.current
					}
					var d = new b.Point(2 * this.current.x - this.control.x, 2
							* this.current.y - this.control.y);
					return d
				};
				this.makeAbsolute = function(d) {
					if (this.isRelativeCommand()) {
						d.x = this.current.x + d.x;
						d.y = this.current.y + d.y
					}
					return d
				};
				this.addMarker = function(d, g) {
					this.addMarkerAngle(d, g == null ? null : g.angleTo(d))
				};
				this.addMarkerAngle = function(g, d) {
					this.points.push(g);
					this.angles.push(d)
				};
				this.getMarkerPoints = function() {
					return this.points
				};
				this.getMarkerAngles = function() {
					for ( var g = 0; g < this.angles.length; g++) {
						if (this.angles[g] == null) {
							for ( var d = g + 1; d < this.angles.length; d++) {
								if (this.angles[d] != null) {
									this.angles[g] = this.angles[d];
									break
								}
							}
						}
					}
					return this.angles
				}
			})(e);
			this.path = function(H) {
				var J = this.PathParser;
				J.reset();
				var t = new b.BoundingBox();
				if (this.attribute("visibility").value == "hidden") {
					return
				}
				if (H != null) {
					H.beginPath()
				}
				while (!J.isEnd()) {
					J.nextCommand();
					switch (J.command.toUpperCase()) {
					case "M":
						var F = J.getAsCurrentPoint();
						J.addMarker(F);
						t.addPoint(F.x, F.y);
						if (H != null) {
							H.moveTo(F.x, F.y)
						}
						J.start = J.current;
						while (!J.isCommandOrEnd()) {
							var F = J.getAsCurrentPoint();
							J.addMarker(F);
							t.addPoint(F.x, F.y);
							if (H != null) {
								H.lineTo(F.x, F.y)
							}
						}
						break;
					case "L":
						while (!J.isCommandOrEnd()) {
							var M = J.current;
							var F = J.getAsCurrentPoint();
							J.addMarker(F, M);
							t.addPoint(F.x, F.y);
							if (H != null) {
								H.lineTo(F.x, F.y)
							}
						}
						break;
					case "H":
						while (!J.isCommandOrEnd()) {
							var g = new b.Point(
									(J.isRelativeCommand() ? J.current.x : 0)
											+ J.getScalar(), J.current.y);
							J.addMarker(g, J.current);
							J.current = g;
							t.addPoint(J.current.x, J.current.y);
							if (H != null) {
								H.lineTo(J.current.x, J.current.y)
							}
						}
						break;
					case "V":
						while (!J.isCommandOrEnd()) {
							var g = new b.Point(J.current.x, (J
									.isRelativeCommand() ? J.current.y : 0)
									+ J.getScalar());
							J.addMarker(g, J.current);
							J.current = g;
							t.addPoint(J.current.x, J.current.y);
							if (H != null) {
								H.lineTo(J.current.x, J.current.y)
							}
						}
						break;
					case "C":
						while (!J.isCommandOrEnd()) {
							var K = J.current;
							var j = J.getPoint();
							var k = J.getAsControlPoint();
							var x = J.getAsCurrentPoint();
							J.addMarker(x, k);
							t.addBezierCurve(K.x, K.y, j.x, j.y, k.x, k.y, x.x,
									x.y);
							if (H != null) {
								H.bezierCurveTo(j.x, j.y, k.x, k.y, x.x, x.y)
							}
						}
						break;
					case "S":
						while (!J.isCommandOrEnd()) {
							var K = J.current;
							var j = J.getReflectedControlPoint();
							var k = J.getAsControlPoint();
							var x = J.getAsCurrentPoint();
							J.addMarker(x, k);
							t.addBezierCurve(K.x, K.y, j.x, j.y, k.x, k.y, x.x,
									x.y);
							if (H != null) {
								H.bezierCurveTo(j.x, j.y, k.x, k.y, x.x, x.y)
							}
						}
						break;
					case "Q":
						while (!J.isCommandOrEnd()) {
							var K = J.current;
							var k = J.getAsControlPoint();
							var x = J.getAsCurrentPoint();
							J.addMarker(x, k);
							t.addQuadraticCurve(K.x, K.y, k.x, k.y, x.x, x.y);
							if (H != null) {
								H.quadraticCurveTo(k.x, k.y, x.x, x.y)
							}
						}
						break;
					case "T":
						while (!J.isCommandOrEnd()) {
							var K = J.current;
							var k = J.getReflectedControlPoint();
							J.control = k;
							var x = J.getAsCurrentPoint();
							J.addMarker(x, k);
							t.addQuadraticCurve(K.x, K.y, k.x, k.y, x.x, x.y);
							if (H != null) {
								H.quadraticCurveTo(k.x, k.y, x.x, x.y)
							}
						}
						break;
					case "A":
						while (!J.isCommandOrEnd()) {
							var K = J.current;
							var q = J.getScalar();
							var o = J.getScalar();
							var f = J.getScalar() * (Math.PI / 180);
							var w = J.getScalar();
							var n = J.getScalar();
							var x = J.getAsCurrentPoint();
							var P = new b.Point(Math.cos(f) * (K.x - x.x) / 2
									+ Math.sin(f) * (K.y - x.y) / 2, -Math
									.sin(f)
									* (K.x - x.x)
									/ 2
									+ Math.cos(f)
									* (K.y - x.y) / 2);
							var I = Math.pow(P.x, 2) / Math.pow(q, 2)
									+ Math.pow(P.y, 2) / Math.pow(o, 2);
							if (I > 1) {
								q *= Math.sqrt(I);
								o *= Math.sqrt(I)
							}
							var B = (w == n ? -1 : 1)
									* Math.sqrt(((Math.pow(q, 2) * Math.pow(o,
											2))
											- (Math.pow(q, 2) * Math
													.pow(P.y, 2)) - (Math.pow(
											o, 2) * Math.pow(P.x, 2)))
											/ (Math.pow(q, 2)
													* Math.pow(P.y, 2) + Math
													.pow(o, 2)
													* Math.pow(P.x, 2)));
							if (isNaN(B)) {
								B = 0
							}
							var A = new b.Point(B * q * P.y / o, B * -o * P.x
									/ q);
							var h = new b.Point((K.x + x.x) / 2 + Math.cos(f)
									* A.x - Math.sin(f) * A.y, (K.y + x.y) / 2
									+ Math.sin(f) * A.x + Math.cos(f) * A.y);
							var G = function(l) {
								return Math.sqrt(Math.pow(l[0], 2)
										+ Math.pow(l[1], 2))
							};
							var D = function(m, l) {
								return (m[0] * l[0] + m[1] * l[1])
										/ (G(m) * G(l))
							};
							var N = function(m, l) {
								return (m[0] * l[1] < m[1] * l[0] ? -1 : 1)
										* Math.acos(D(m, l))
							};
							var O = N([ 1, 0 ], [ (P.x - A.x) / q,
									(P.y - A.y) / o ]);
							var z = [ (P.x - A.x) / q, (P.y - A.y) / o ];
							var y = [ (-P.x - A.x) / q, (-P.y - A.y) / o ];
							var L = N(z, y);
							if (D(z, y) <= -1) {
								L = Math.PI
							}
							if (D(z, y) >= 1) {
								L = 0
							}
							if (n == 0 && L > 0) {
								L = L - 2 * Math.PI
							}
							if (n == 1 && L < 0) {
								L = L + 2 * Math.PI
							}
							var d = new b.Point(
									h.x - q * Math.cos((O + L) / 2), h.y - o
											* Math.sin((O + L) / 2));
							J.addMarkerAngle(d, (O + L) / 2 + (n == 0 ? 1 : -1)
									* Math.PI / 2);
							J.addMarkerAngle(x, L + (n == 0 ? 1 : -1) * Math.PI
									/ 2);
							t.addPoint(x.x, x.y);
							if (H != null) {
								var D = q > o ? q : o;
								var E = q > o ? 1 : q / o;
								var C = q > o ? o / q : 1;
								H.translate(h.x, h.y);
								H.rotate(f);
								H.scale(E, C);
								H.arc(0, 0, D, O, O + L, 1 - n);
								H.scale(1 / E, 1 / C);
								H.rotate(-f);
								H.translate(-h.x, -h.y)
							}
						}
						break;
					case "Z":
						if (H != null) {
							H.closePath()
						}
						J.current = J.start
					}
				}
				return t
			};
			this.getMarkers = function() {
				var f = this.PathParser.getMarkerPoints();
				var h = this.PathParser.getMarkerAngles();
				var g = [];
				for ( var d = 0; d < f.length; d++) {
					g.push([ f[d], h[d] ])
				}
				return g
			}
		};
		b.Element.path.prototype = new b.Element.PathElementBase;
		b.Element.pattern = function(c) {
			this.base = b.Element.ElementBase;
			this.base(c);
			this.createPattern = function(d, e) {
				var f = new b.Element.svg();
				f.attributes.viewBox = new b.Property("viewBox", this
						.attribute("viewBox").value);
				f.attributes.x = new b.Property("x", this.attribute("x").value);
				f.attributes.y = new b.Property("y", this.attribute("y").value);
				f.attributes.width = new b.Property("width", this
						.attribute("width").value);
				f.attributes.height = new b.Property("height", this
						.attribute("height").value);
				f.children = this.children;
				var g = document.createElement("canvas");
				g.width = this.attribute("width").Length.toPixels();
				g.height = this.attribute("height").Length.toPixels();
				f.render(g.getContext("2d"));
				return d.createPattern(g, "repeat")
			}
		};
		b.Element.pattern.prototype = new b.Element.ElementBase;
		b.Element.marker = function(c) {
			this.base = b.Element.ElementBase;
			this.base(c);
			this.baseRender = this.render;
			this.render = function(e, d, g) {
				e.translate(d.x, d.y);
				if (this.attribute("orient").valueOrDefault("auto") == "auto") {
					e.rotate(g)
				}
				if (this.attribute("markerUnits").valueOrDefault("strokeWidth") == "strokeWidth") {
					e.scale(e.lineWidth, e.lineWidth)
				}
				e.save();
				var f = new b.Element.svg();
				f.attributes.viewBox = new b.Property("viewBox", this
						.attribute("viewBox").value);
				f.attributes.refX = new b.Property("refX", this
						.attribute("refX").value);
				f.attributes.refY = new b.Property("refY", this
						.attribute("refY").value);
				f.attributes.width = new b.Property("width", this
						.attribute("markerWidth").value);
				f.attributes.height = new b.Property("height", this
						.attribute("markerHeight").value);
				f.attributes.fill = new b.Property("fill", this.attribute(
						"fill").valueOrDefault("black"));
				f.attributes.stroke = new b.Property("stroke", this.attribute(
						"stroke").valueOrDefault("none"));
				f.children = this.children;
				f.render(e);
				e.restore();
				if (this.attribute("markerUnits").valueOrDefault("strokeWidth") == "strokeWidth") {
					e.scale(1 / e.lineWidth, 1 / e.lineWidth)
				}
				if (this.attribute("orient").valueOrDefault("auto") == "auto") {
					e.rotate(-g)
				}
				e.translate(-d.x, -d.y)
			}
		};
		b.Element.marker.prototype = new b.Element.ElementBase;
		b.Element.defs = function(c) {
			this.base = b.Element.ElementBase;
			this.base(c);
			this.render = function(d) {
			}
		};
		b.Element.defs.prototype = new b.Element.ElementBase;
		b.Element.GradientBase = function(d) {
			this.base = b.Element.ElementBase;
			this.base(d);
			this.gradientUnits = this.attribute("gradientUnits")
					.valueOrDefault("objectBoundingBox");
			this.stops = [];
			for ( var c = 0; c < this.children.length; c++) {
				var e = this.children[c];
				this.stops.push(e)
			}
			this.getGradient = function() {
			};
			this.createGradient = function(f, k) {
				var h = this;
				if (this.attribute("xlink:href").hasValue()) {
					h = this.attribute("xlink:href").Definition.getDefinition()
				}
				var l = this.getGradient(f, k);
				for ( var j = 0; j < h.stops.length; j++) {
					l.addColorStop(h.stops[j].offset, h.stops[j].color)
				}
				return l
			}
		};
		b.Element.GradientBase.prototype = new b.Element.ElementBase;
		b.Element.linearGradient = function(c) {
			this.base = b.Element.GradientBase;
			this.base(c);
			this.getGradient = function(n, g) {
				var h = g.getBoundingBox();
				var e = (this.gradientUnits == "objectBoundingBox" ? h.x()
						+ h.width() * this.attribute("x1").numValue() : this
						.attribute("x1").Length.toPixels("x"));
				var k = (this.gradientUnits == "objectBoundingBox" ? h.y()
						+ h.height() * this.attribute("y1").numValue() : this
						.attribute("y1").Length.toPixels("y"));
				var d = (this.gradientUnits == "objectBoundingBox" ? h.x()
						+ h.width() * this.attribute("x2").numValue() : this
						.attribute("x2").Length.toPixels("x"));
				var j = (this.gradientUnits == "objectBoundingBox" ? h.y()
						+ h.height() * this.attribute("y2").numValue() : this
						.attribute("y2").Length.toPixels("y"));
				var m = new b.Point(e, k);
				var l = new b.Point(d, j);
				if (this.attribute("gradientTransform").hasValue()) {
					var f = new b.Transform(
							this.attribute("gradientTransform").value);
					f.applyToPoint(m);
					f.applyToPoint(l)
				}
				return n.createLinearGradient(m.x, m.y, l.x, l.y)
			}
		};
		b.Element.linearGradient.prototype = new b.Element.GradientBase;
		b.Element.radialGradient = function(c) {
			this.base = b.Element.GradientBase;
			this.base(c);
			this.getGradient = function(t, m) {
				var q = m.getBoundingBox();
				var k = (this.gradientUnits == "objectBoundingBox" ? q.x()
						+ q.width() * this.attribute("cx").numValue() : this
						.attribute("cx").Length.toPixels("x"));
				var h = (this.gradientUnits == "objectBoundingBox" ? q.y()
						+ q.height() * this.attribute("cy").numValue() : this
						.attribute("cy").Length.toPixels("y"));
				var j = k;
				var g = h;
				if (this.attribute("fx").hasValue()) {
					j = (this.gradientUnits == "objectBoundingBox" ? q.x()
							+ q.width() * this.attribute("fx").numValue()
							: this.attribute("fx").Length.toPixels("x"))
				}
				if (this.attribute("fy").hasValue()) {
					g = (this.gradientUnits == "objectBoundingBox" ? q.y()
							+ q.height() * this.attribute("fy").numValue()
							: this.attribute("fy").Length.toPixels("y"))
				}
				var d = (this.gradientUnits == "objectBoundingBox" ? (q.width() + q
						.height())
						/ 2 * this.attribute("r").numValue()
						: this.attribute("r").Length.toPixels());
				var s = new b.Point(k, h);
				var p = new b.Point(j, g);
				if (this.attribute("gradientTransform").hasValue()) {
					var e = new b.Transform(
							this.attribute("gradientTransform").value);
					e.applyToPoint(s);
					e.applyToPoint(p);
					for ( var l = 0; l < e.transforms.length; l++) {
						var o = e.transforms[l].m[0];
						var n = e.transforms[l].m[3];
						d = d * ((o + n) / 2)
					}
				}
				return t.createRadialGradient(p.x, p.y, 0, s.x, s.y, d)
			}
		};
		b.Element.radialGradient.prototype = new b.Element.GradientBase;
		b.Element.stop = function(d) {
			this.base = b.Element.ElementBase;
			this.base(d);
			this.offset = this.attribute("offset").numValue();
			var c = this.style("stop-color");
			if (this.style("stop-opacity").hasValue()) {
				c = c.Color.addOpacity(this.style("stop-opacity").value)
			}
			this.color = c.value
		};
		b.Element.stop.prototype = new b.Element.ElementBase;
		b.Element.AnimateBase = function(c) {
			this.base = b.Element.ElementBase;
			this.base(c);
			b.Animations.push(this);
			this.duration = 0;
			this.begin = this.attribute("begin").Time.toMilliseconds();
			this.maxDuration = this.begin
					+ this.attribute("dur").Time.toMilliseconds();
			this.getProperty = function() {
				var e = this.attribute("attributeType").value;
				var d = this.attribute("attributeName").value;
				if (e == "CSS") {
					return this.parent.style(d, true)
				}
				return this.parent.attribute(d, true)
			};
			this.initialValue = null;
			this.removed = false;
			this.calcValue = function() {
				return ""
			};
			this.update = function(g) {
				if (this.initialValue == null) {
					this.initialValue = this.getProperty().value
				}
				if (this.duration > this.maxDuration) {
					if (this.attribute("repeatCount").value == "indefinite") {
						this.duration = 0
					} else {
						if (this.attribute("fill").valueOrDefault("remove") == "remove"
								&& !this.removed) {
							this.removed = true;
							this.getProperty().value = this.initialValue;
							return true
						} else {
							return false
						}
					}
				}
				this.duration = this.duration + g;
				var d = false;
				if (this.begin < this.duration) {
					var f = this.calcValue();
					if (this.attribute("type").hasValue()) {
						var e = this.attribute("type").value;
						f = e + "(" + f + ")"
					}
					this.getProperty().value = f;
					d = true
				}
				return d
			};
			this.progress = function() {
				return ((this.duration - this.begin) / (this.maxDuration - this.begin))
			}
		};
		b.Element.AnimateBase.prototype = new b.Element.ElementBase;
		b.Element.animate = function(c) {
			this.base = b.Element.AnimateBase;
			this.base(c);
			this.calcValue = function() {
				var e = this.attribute("from").numValue();
				var d = this.attribute("to").numValue();
				return e + (d - e) * this.progress()
			}
		};
		b.Element.animate.prototype = new b.Element.AnimateBase;
		b.Element.animateColor = function(c) {
			this.base = b.Element.AnimateBase;
			this.base(c);
			this.calcValue = function() {
				var j = new RGBColor(this.attribute("from").value);
				var h = new RGBColor(this.attribute("to").value);
				if (j.ok && h.ok) {
					var f = j.r + (h.r - j.r) * this.progress();
					var e = j.g + (h.g - j.g) * this.progress();
					var d = j.b + (h.b - j.b) * this.progress();
					return "rgb(" + parseInt(f, 10) + "," + parseInt(e, 10)
							+ "," + parseInt(d, 10) + ")"
				}
				return this.attribute("from").value
			}
		};
		b.Element.animateColor.prototype = new b.Element.AnimateBase;
		b.Element.animateTransform = function(c) {
			this.base = b.Element.animate;
			this.base(c)
		};
		b.Element.animateTransform.prototype = new b.Element.animate;
		b.Element.text = function(e) {
			this.base = b.Element.RenderedElementBase;
			this.base(e);
			if (e != null) {
				this.children = [];
				for ( var d = 0; d < e.childNodes.length; d++) {
					var c = e.childNodes[d];
					if (c.nodeType == 1) {
						this.addChild(c, true)
					} else {
						if (c.nodeType == 3) {
							this.addChild(new b.Element.tspan(c), false)
						}
					}
				}
			}
			this.baseSetContext = this.setContext;
			this.setContext = function(g) {
				this.baseSetContext(g);
				if (this.attribute("text-anchor").hasValue()) {
					var f = this.attribute("text-anchor").value;
					g.textAlign = f == "middle" ? "center" : f
				}
				if (this.attribute("alignment-baseline").hasValue()) {
					g.textBaseline = this.attribute("alignment-baseline").value
				}
			};
			this.renderChildren = function(g) {
				if (this.attribute("visibility").value == "hidden") {
					return
				}
				var f = this.attribute("x").Length.toPixels("x");
				var k = this.attribute("y").Length.toPixels("y");
				for ( var h = 0; h < this.children.length; h++) {
					var j = this.children[h];
					if (j.attribute("x").hasValue()) {
						j.x = j.attribute("x").Length.toPixels("x")
					} else {
						if (j.attribute("dx").hasValue()) {
							f += j.attribute("dx").Length.toPixels("x")
						}
						j.x = f;
						f += j.measureText(g)
					}
					if (j.attribute("y").hasValue()) {
						j.y = j.attribute("y").Length.toPixels("y")
					} else {
						if (j.attribute("dy").hasValue()) {
							k += j.attribute("dy").Length.toPixels("y")
						}
						j.y = k
					}
					j.render(g)
				}
			}
		};
		b.Element.text.prototype = new b.Element.RenderedElementBase;
		b.Element.TextElementBase = function(c) {
			this.base = b.Element.RenderedElementBase;
			this.base(c);
			this.renderChildren = function(d) {
				d.fillText(b.compressSpaces(this.getText()), this.x, this.y)
			};
			this.getText = function() {
			};
			this.measureText = function(d) {
				var e = b.compressSpaces(this.getText());
				if (!d.measureText) {
					return e.length * 10
				}
				return d.measureText(e).width
			}
		};
		b.Element.TextElementBase.prototype = new b.Element.RenderedElementBase;
		b.Element.tspan = function(c) {
			this.base = b.Element.TextElementBase;
			this.base(c);
			this.text = c.nodeType == 3 ? c.nodeValue
					: c.childNodes[0].nodeValue;
			this.getText = function() {
				return this.text
			}
		};
		b.Element.tspan.prototype = new b.Element.TextElementBase;
		b.Element.tref = function(c) {
			this.base = b.Element.TextElementBase;
			this.base(c);
			this.getText = function() {
				var d = this.attribute("xlink:href").Definition.getDefinition();
				if (d != null) {
					return d.children[0].getText()
				}
			}
		};
		b.Element.tref.prototype = new b.Element.TextElementBase;
		b.Element.a = function(d) {
			this.base = b.Element.TextElementBase;
			this.base(d);
			this.hasText = true;
			for ( var c = 0; c < d.childNodes.length; c++) {
				if (d.childNodes[c].nodeType != 3) {
					this.hasText = false
				}
			}
			this.text = this.hasText ? d.childNodes[0].nodeValue : "";
			this.getText = function() {
				return this.text
			};
			this.baseRenderChildren = this.renderChildren;
			this.renderChildren = function(e) {
				if (this.hasText) {
					this.baseRenderChildren(e);
					var h = new b.Property("fontSize",
							b.Font.Parse(b.ctx.font).fontSize);
					b.Mouse.checkBoundingBox(this, new b.BoundingBox(this.x,
							this.y - h.Length.toPixels("y"), this.x
									+ this.measureText(e), this.y))
				} else {
					var f = new b.Element.g();
					f.children = this.children;
					f.parent = this;
					f.render(e)
				}
			};
			this.onclick = function() {
				window.open(this.attribute("xlink:href").value)
			};
			this.onmousemove = function() {
				b.ctx.canvas.style.cursor = "pointer"
			}
		};
		b.Element.a.prototype = new b.Element.TextElementBase;
		b.Element.image = function(d) {
			this.base = b.Element.RenderedElementBase;
			this.base(d);
			b.Images.push(this);
			this.img = document.createElement("img");
			this.loaded = false;
			var c = this;
			this.img.onload = function() {
				c.loaded = true
			};
			this.img.src = this.attribute("xlink:href").value;
			this.renderChildren = function(g) {
				var f = this.attribute("x").Length.toPixels("x");
				var j = this.attribute("y").Length.toPixels("y");
				var h = this.attribute("width").Length.toPixels("x");
				var e = this.attribute("height").Length.toPixels("y");
				if (h == 0 || e == 0) {
					return
				}
				g.save();
				g.translate(f, j);
				b.AspectRatio(g, this.attribute("preserveAspectRatio").value,
						h, this.img.width, e, this.img.height, 0, 0);
				g.drawImage(this.img, 0, 0);
				g.restore()
			}
		};
		b.Element.image.prototype = new b.Element.RenderedElementBase;
		b.Element.g = function(c) {
			this.base = b.Element.RenderedElementBase;
			this.base(c);
			this.getBoundingBox = function() {
				var e = new b.BoundingBox();
				for ( var d = 0; d < this.children.length; d++) {
					e.addBoundingBox(this.children[d].getBoundingBox())
				}
				return e
			}
		};
		b.Element.g.prototype = new b.Element.RenderedElementBase;
		b.Element.symbol = function(c) {
			this.base = b.Element.RenderedElementBase;
			this.base(c);
			this.baseSetContext = this.setContext;
			this.setContext = function(e) {
				this.baseSetContext(e);
				if (this.attribute("viewBox").hasValue()) {
					var f = b.ToNumberArray(this.attribute("viewBox").value);
					var d = f[0];
					var g = f[1];
					width = f[2];
					height = f[3];
					b.AspectRatio(e,
							this.attribute("preserveAspectRatio").value, this
									.attribute("width").Length.toPixels("x"),
							width, this.attribute("height").Length
									.toPixels("y"), height, d, g);
					b.ViewPort.SetCurrent(f[2], f[3])
				}
			}
		};
		b.Element.symbol.prototype = new b.Element.RenderedElementBase;
		b.Element.style = function(e) {
			this.base = b.Element.ElementBase;
			this.base(e);
			var m = e.childNodes[0].nodeValue;
			m = m
					.replace(
							/(\/\*([^*]|[\r\n]|(\*+([^*\/]|[\r\n])))*\*+\/)|(\/\/.*)/gm,
							"");
			m = b.compressSpaces(m);
			var q = m.split("}");
			for ( var l = 0; l < q.length; l++) {
				if (b.trim(q[l]) != "") {
					var n = q[l].split("{");
					var o = n[0].split(",");
					var g = n[1].split(";");
					for ( var h = 0; h < o.length; h++) {
						var s = b.trim(o[h]);
						if (s != "") {
							var p = {};
							for ( var f = 0; f < g.length; f++) {
								var d = g[f].split(":");
								var c = d[0];
								var r = d[1];
								if (c != null && r != null) {
									p[b.trim(d[0])] = new b.Property(b
											.trim(d[0]), b.trim(d[1]))
								}
							}
							b.Styles[s] = p
						}
					}
				}
			}
		};
		b.Element.style.prototype = new b.Element.ElementBase;
		b.Element.use = function(c) {
			this.base = b.Element.RenderedElementBase;
			this.base(c);
			this.baseSetContext = this.setContext;
			this.setContext = function(d) {
				this.baseSetContext(d);
				if (this.attribute("x").hasValue()) {
					d.translate(this.attribute("x").Length.toPixels("x"), 0)
				}
				if (this.attribute("y").hasValue()) {
					d.translate(0, this.attribute("y").Length.toPixels("y"))
				}
			};
			this.getDefinition = function() {
				var d = this.attribute("xlink:href").Definition.getDefinition();
				if (this.attribute("width").hasValue()) {
					d.attribute("width", true).value = this.attribute("width").value
				}
				if (this.attribute("height").hasValue()) {
					d.attribute("height", true).value = this
							.attribute("height").value
				}
				return d
			};
			this.path = function(d) {
				var e = this.getDefinition();
				if (e != null) {
					e.path(d)
				}
			};
			this.renderChildren = function(d) {
				var e = this.getDefinition();
				if (e != null) {
					e.render(d)
				}
			}
		};
		b.Element.use.prototype = new b.Element.RenderedElementBase;
		b.Element.clipPath = function(c) {
			this.base = b.Element.ElementBase;
			this.base(c);
			this.apply = function(d) {
				for ( var e = 0; e < this.children.length; e++) {
					if (this.children[e].path) {
						this.children[e].path(d);
						d.clip()
					}
				}
			}
		};
		b.Element.clipPath.prototype = new b.Element.ElementBase;
		b.Element.title = function(c) {
		};
		b.Element.title.prototype = new b.Element.ElementBase;
		b.Element.desc = function(c) {
		};
		b.Element.desc.prototype = new b.Element.ElementBase;
		b.Element.MISSING = function(c) {
			console.log("ERROR: Element '" + c.nodeName
					+ "' not yet implemented.")
		};
		b.Element.MISSING.prototype = new b.Element.ElementBase;
		b.CreateElement = function(d) {
			var c = d.nodeName.replace(/^[^:]+:/, "");
			var f = null;
			if (typeof (b.Element[c]) != "undefined") {
				f = new b.Element[c](d)
			} else {
				f = new b.Element.MISSING(d)
			}
			f.type = d.nodeName;
			return f
		};
		b.load = function(c, d) {
			b.loadXml(c, b.ajax(d))
		};
		b.loadXml = function(g, j) {
			b.init(g);
			var f = function(n) {
				var m = g.canvas;
				while (m) {
					n.x -= m.offsetLeft;
					n.y -= m.offsetTop;
					m = m.offsetParent
				}
				if (window.scrollX) {
					n.x += window.scrollX
				}
				if (window.scrollY) {
					n.y += window.scrollY
				}
				return n
			};
			if (b.opts == null || b.opts.ignoreMouse != true) {
				g.canvas.onclick = function(n) {
					var m = f(new b.Point(
							n != null ? n.clientX : event.clientX,
							n != null ? n.clientY : event.clientY));
					b.Mouse.onclick(m.x, m.y)
				};
				g.canvas.onmousemove = function(n) {
					var m = f(new b.Point(
							n != null ? n.clientX : event.clientX,
							n != null ? n.clientY : event.clientY));
					b.Mouse.onmousemove(m.x, m.y)
				}
			}
			var l = b.parseXml(j);
			var k = b.CreateElement(l.documentElement);
			var h = true;
			var d = function() {
				if (b.opts == null || b.opts.ignoreDimensions != true) {
					if (k.style("width").hasValue()) {
						g.canvas.width = k.style("width").Length
								.toPixels(g.canvas.parentNode.clientWidth)
					}
					if (k.style("height").hasValue()) {
						g.canvas.height = k.style("height").Length
								.toPixels(g.canvas.parentNode.clientHeight)
					}
				}
				b.ViewPort.SetCurrent(g.canvas.clientWidth,
						g.canvas.clientHeight);
				if (b.opts != null && b.opts.offsetX != null) {
					k.attribute("x", true).value = b.opts.offsetX
				}
				if (b.opts != null && b.opts.offsetY != null) {
					k.attribute("y", true).value = b.opts.offsetY
				}
				if (b.opts != null && b.opts.scaleWidth != null
						&& b.opts.scaleHeight != null) {
					k.attribute("width", true).value = b.opts.scaleWidth;
					k.attribute("height", true).value = b.opts.scaleHeight;
					k.attribute("viewBox", true).value = "0 0 "
							+ g.canvas.clientWidth + " "
							+ g.canvas.clientHeight;
					k.attribute("preserveAspectRatio", true).value = "none"
				}
				if (b.opts == null || b.opts.ignoreClear != true) {
					g.clearRect(0, 0, g.canvas.clientWidth,
							g.canvas.clientHeight)
				}
				k.render(g);
				if (h) {
					h = false;
					if (b.opts != null
							&& typeof (b.opts.renderCallback) == "function") {
						b.opts.renderCallback()
					}
				}
			};
			var c = true;
			if (b.ImagesLoaded()) {
				c = false;
				d()
			}
			b.intervalID = setInterval(
					function() {
						var m = false;
						if (c && b.ImagesLoaded()) {
							c = false;
							m = true
						}
						if (b.opts == null || b.opts.ignoreMouse != true) {
							m = m | b.Mouse.hasEvents()
						}
						if (b.opts == null || b.opts.ignoreAnimation != true) {
							for ( var e = 0; e < b.Animations.length; e++) {
								m = m
										| b.Animations[e]
												.update(1000 / b.FRAMERATE)
							}
						}
						if (b.opts != null
								&& typeof (b.opts.forceRedraw) == "function") {
							if (b.opts.forceRedraw() == true) {
								m = true
							}
						}
						if (m) {
							d();
							b.Mouse.runEvents()
						}
					}, 1000 / b.FRAMERATE)
		};
		b.stop = function() {
			if (b.intervalID) {
				clearInterval(b.intervalID)
			}
		};
		b.Mouse = new (function() {
			this.events = [];
			this.hasEvents = function() {
				return this.events.length != 0
			};
			this.onclick = function(c, d) {
				this.events.push({
					type : "onclick",
					x : c,
					y : d,
					run : function(f) {
						if (f.onclick) {
							f.onclick()
						}
					}
				})
			};
			this.onmousemove = function(c, d) {
				this.events.push({
					type : "onmousemove",
					x : c,
					y : d,
					run : function(f) {
						if (f.onmousemove) {
							f.onmousemove()
						}
					}
				})
			};
			this.eventElements = [];
			this.checkPath = function(f, c) {
				for ( var d = 0; d < this.events.length; d++) {
					var g = this.events[d];
					if (c.isPointInPath && c.isPointInPath(g.x, g.y)) {
						this.eventElements[d] = f
					}
				}
			};
			this.checkBoundingBox = function(d, g) {
				for ( var c = 0; c < this.events.length; c++) {
					var f = this.events[c];
					if (g.isPointInBox(f.x, f.y)) {
						this.eventElements[c] = d
					}
				}
			};
			this.runEvents = function() {
				b.ctx.canvas.style.cursor = "";
				for ( var d = 0; d < this.events.length; d++) {
					var f = this.events[d];
					var c = this.eventElements[d];
					while (c) {
						f.run(c);
						c = c.parent
					}
				}
				this.events = [];
				this.eventElements = []
			}
		});
		return b
	}
})();
if (CanvasRenderingContext2D) {
	CanvasRenderingContext2D.prototype.drawSvg = function(d, b, a, c, e) {
		canvg(this.canvas, d, {
			ignoreMouse : true,
			ignoreAnimation : true,
			ignoreDimensions : true,
			ignoreClear : true,
			offsetX : b,
			offsetY : a,
			scaleWidth : c,
			scaleHeight : e
		})
	}
}
function RGBColor(g) {
	this.ok = false;
	if (g.charAt(0) == "#") {
		g = g.substr(1, 6)
	}
	g = g.replace(/ /g, "");
	g = g.toLowerCase();
	var a = {
		aliceblue : "f0f8ff",
		antiquewhite : "faebd7",
		aqua : "00ffff",
		aquamarine : "7fffd4",
		azure : "f0ffff",
		beige : "f5f5dc",
		bisque : "ffe4c4",
		black : "000000",
		blanchedalmond : "ffebcd",
		blue : "0000ff",
		blueviolet : "8a2be2",
		brown : "a52a2a",
		burlywood : "deb887",
		cadetblue : "5f9ea0",
		chartreuse : "7fff00",
		chocolate : "d2691e",
		coral : "ff7f50",
		cornflowerblue : "6495ed",
		cornsilk : "fff8dc",
		crimson : "dc143c",
		cyan : "00ffff",
		darkblue : "00008b",
		darkcyan : "008b8b",
		darkgoldenrod : "b8860b",
		darkgray : "a9a9a9",
		darkgreen : "006400",
		darkkhaki : "bdb76b",
		darkmagenta : "8b008b",
		darkolivegreen : "556b2f",
		darkorange : "ff8c00",
		darkorchid : "9932cc",
		darkred : "8b0000",
		darksalmon : "e9967a",
		darkseagreen : "8fbc8f",
		darkslateblue : "483d8b",
		darkslategray : "2f4f4f",
		darkturquoise : "00ced1",
		darkviolet : "9400d3",
		deeppink : "ff1493",
		deepskyblue : "00bfff",
		dimgray : "696969",
		dodgerblue : "1e90ff",
		feldspar : "d19275",
		firebrick : "b22222",
		floralwhite : "fffaf0",
		forestgreen : "228b22",
		fuchsia : "ff00ff",
		gainsboro : "dcdcdc",
		ghostwhite : "f8f8ff",
		gold : "ffd700",
		goldenrod : "daa520",
		gray : "808080",
		green : "008000",
		greenyellow : "adff2f",
		honeydew : "f0fff0",
		hotpink : "ff69b4",
		indianred : "cd5c5c",
		indigo : "4b0082",
		ivory : "fffff0",
		khaki : "f0e68c",
		lavender : "e6e6fa",
		lavenderblush : "fff0f5",
		lawngreen : "7cfc00",
		lemonchiffon : "fffacd",
		lightblue : "add8e6",
		lightcoral : "f08080",
		lightcyan : "e0ffff",
		lightgoldenrodyellow : "fafad2",
		lightgrey : "d3d3d3",
		lightgreen : "90ee90",
		lightpink : "ffb6c1",
		lightsalmon : "ffa07a",
		lightseagreen : "20b2aa",
		lightskyblue : "87cefa",
		lightslateblue : "8470ff",
		lightslategray : "778899",
		lightsteelblue : "b0c4de",
		lightyellow : "ffffe0",
		lime : "00ff00",
		limegreen : "32cd32",
		linen : "faf0e6",
		magenta : "ff00ff",
		maroon : "800000",
		mediumaquamarine : "66cdaa",
		mediumblue : "0000cd",
		mediumorchid : "ba55d3",
		mediumpurple : "9370d8",
		mediumseagreen : "3cb371",
		mediumslateblue : "7b68ee",
		mediumspringgreen : "00fa9a",
		mediumturquoise : "48d1cc",
		mediumvioletred : "c71585",
		midnightblue : "191970",
		mintcream : "f5fffa",
		mistyrose : "ffe4e1",
		moccasin : "ffe4b5",
		navajowhite : "ffdead",
		navy : "000080",
		oldlace : "fdf5e6",
		olive : "808000",
		olivedrab : "6b8e23",
		orange : "ffa500",
		orangered : "ff4500",
		orchid : "da70d6",
		palegoldenrod : "eee8aa",
		palegreen : "98fb98",
		paleturquoise : "afeeee",
		palevioletred : "d87093",
		papayawhip : "ffefd5",
		peachpuff : "ffdab9",
		peru : "cd853f",
		pink : "ffc0cb",
		plum : "dda0dd",
		powderblue : "b0e0e6",
		purple : "800080",
		red : "ff0000",
		rosybrown : "bc8f8f",
		royalblue : "4169e1",
		saddlebrown : "8b4513",
		salmon : "fa8072",
		sandybrown : "f4a460",
		seagreen : "2e8b57",
		seashell : "fff5ee",
		sienna : "a0522d",
		silver : "c0c0c0",
		skyblue : "87ceeb",
		slateblue : "6a5acd",
		slategray : "708090",
		snow : "fffafa",
		springgreen : "00ff7f",
		steelblue : "4682b4",
		tan : "d2b48c",
		teal : "008080",
		thistle : "d8bfd8",
		tomato : "ff6347",
		turquoise : "40e0d0",
		violet : "ee82ee",
		violetred : "d02090",
		wheat : "f5deb3",
		white : "ffffff",
		whitesmoke : "f5f5f5",
		yellow : "ffff00",
		yellowgreen : "9acd32"
	};
	for ( var c in a) {
		if (g == c) {
			g = a[c]
		}
	}
	var h = [
			{
				re : /^rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)$/,
				example : [ "rgb(123, 234, 45)", "rgb(255,234,245)" ],
				process : function(j) {
					return [ parseInt(j[1]), parseInt(j[2]), parseInt(j[3]) ]
				}
			},
			{
				re : /^(\w{2})(\w{2})(\w{2})$/,
				example : [ "#00ff00", "336699" ],
				process : function(j) {
					return [ parseInt(j[1], 16), parseInt(j[2], 16),
							parseInt(j[3], 16) ]
				}
			},
			{
				re : /^(\w{1})(\w{1})(\w{1})$/,
				example : [ "#fb0", "f0f" ],
				process : function(j) {
					return [ parseInt(j[1] + j[1], 16),
							parseInt(j[2] + j[2], 16),
							parseInt(j[3] + j[3], 16) ]
				}
			} ];
	for ( var b = 0; b < h.length; b++) {
		var e = h[b].re;
		var d = h[b].process;
		var f = e.exec(g);
		if (f) {
			channels = d(f);
			this.r = channels[0];
			this.g = channels[1];
			this.b = channels[2];
			this.ok = true
		}
	}
	this.r = (this.r < 0 || isNaN(this.r)) ? 0
			: ((this.r > 255) ? 255 : this.r);
	this.g = (this.g < 0 || isNaN(this.g)) ? 0
			: ((this.g > 255) ? 255 : this.g);
	this.b = (this.b < 0 || isNaN(this.b)) ? 0
			: ((this.b > 255) ? 255 : this.b);
	this.toRGB = function() {
		return "rgb(" + this.r + ", " + this.g + ", " + this.b + ")"
	};
	this.toHex = function() {
		var l = this.r.toString(16);
		var k = this.g.toString(16);
		var j = this.b.toString(16);
		if (l.length == 1) {
			l = "0" + l
		}
		if (k.length == 1) {
			k = "0" + k
		}
		if (j.length == 1) {
			j = "0" + j
		}
		return "#" + l + k + j
	};
	this.getHelpXML = function() {
		var m = new Array();
		for ( var o = 0; o < h.length; o++) {
			var l = h[o].example;
			for ( var n = 0; n < l.length; n++) {
				m[m.length] = l[n]
			}
		}
		for ( var t in a) {
			m[m.length] = t
		}
		var p = document.createElement("ul");
		p.setAttribute("id", "rgbcolor-examples");
		for ( var o = 0; o < m.length; o++) {
			try {
				var q = document.createElement("li");
				var s = new RGBColor(m[o]);
				var u = document.createElement("div");
				u.style.cssText = "margin: 3px; border: 1px solid black; background:"
						+ s.toHex() + "; color:" + s.toHex();
				u.appendChild(document.createTextNode("test"));
				var k = document.createTextNode(" " + m[o] + " -> " + s.toRGB()
						+ " -> " + s.toHex());
				q.appendChild(u);
				q.appendChild(k);
				p.appendChild(q)
			} catch (r) {
			}
		}
		return p
	}
};