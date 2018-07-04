Convert = (function() {
	function Convert() {
	}
	Convert.hexToRGB = function(hex) {
		var b, g, r;
		if (hex.charAt(0) === "#") {
			hex = hex.substr(1);
		}
		r = parseInt(hex.substr(0, 2), 16);
		g = parseInt(hex.substr(2, 2), 16);
		b = parseInt(hex.substr(4, 2), 16);
		return {
			r : r,
			g : g,
			b : b
		};
	};
	Convert.rgbToHSL = function(r, g, b) {
		var d, h, l, max, min, s;
		if (typeof r === "object") {
			g = r.g;
			b = r.b;
			r = r.r;
		}
		r /= 255;
		g /= 255;
		b /= 255;
		max = Math.max(r, g, b);
		min = Math.min(r, g, b);
		l = (max + min) / 2;
		if (max === min) {
			h = s = 0;
		} else {
			d = max - min;
			s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
			h = (function() {
				switch (max) {
				case r:
					return (g - b) / d + (g < b ? 6 : 0);
				case g:
					return (b - r) / d + 2;
				case b:
					return (r - g) / d + 4;
				}
			})();
			h /= 6;
		}
		return {
			h : h,
			s : s,
			l : l
		};
	};
	Convert.hslToRGB = function(h, s, l) {
		var b, g, p, q, r;
		if (typeof h === "object") {
			s = h.s;
			l = h.l;
			h = h.h;
		}
		if (s === 0) {
			r = g = b = l;
		} else {
			q = l < 0.5 ? l * (1 + s) : l + s - l * s;
			p = 2 * l - q;
			r = this.hueToRGB(p, q, h + 1 / 3);
			g = this.hueToRGB(p, q, h);
			b = this.hueToRGB(p, q, h - 1 / 3);
		}
		return {
			r : r * 255,
			g : g * 255,
			b : b * 255
		};
	};
	Convert.hueToRGB = function(p, q, t) {
		if (t < 0) {
			t += 1;
		}
		if (t > 1) {
			t -= 1;
		}
		if (t < 1 / 6) {
			return p + (q - p) * 6 * t;
		}
		if (t < 1 / 2) {
			return q;
		}
		if (t < 2 / 3) {
			return p + (q - p) * (2 / 3 - t) * 6;
		}
		return p;
	};
	Convert.rgbToHSV = function(r, g, b) {
		var d, h, max, min, s, v;
		r /= 255;
		g /= 255;
		b /= 255;
		max = Math.max(r, g, b);
		min = Math.min(r, g, b);
		v = max;
		d = max - min;
		s = max === 0 ? 0 : d / max;
		if (max === min) {
			h = 0;
		} else {
			h = (function() {
				switch (max) {
				case r:
					return (g - b) / d + (g < b ? 6 : 0);
				case g:
					return (b - r) / d + 2;
				case b:
					return (r - g) / d + 4;
				}
			})();
			h /= 6;
		}
		return {
			h : h,
			s : s,
			v : v
		};
	};
	Convert.hsvToRGB = function(h, s, v) {
		var b, f, g, i, p, q, r, t;
		i = Math.floor(h * 6);
		f = h * 6 - i;
		p = v * (1 - s);
		q = v * (1 - f * s);
		t = v * (1 - (1 - f) * s);
		switch (i % 6) {
		case 0:
			r = v;
			g = t;
			b = p;
			break;
		case 1:
			r = q;
			g = v;
			b = p;
			break;
		case 2:
			r = p;
			g = v;
			b = t;
			break;
		case 3:
			r = p;
			g = q;
			b = v;
			break;
		case 4:
			r = t;
			g = p;
			b = v;
			break;
		case 5:
			r = v;
			g = p;
			b = q;
		}
		return {
			r : r * 255,
			g : g * 255,
			b : b * 255
		};
	};
	Convert.rgbToXYZ = function(r, g, b) {
		var x, y, z;
		r /= 255;
		g /= 255;
		b /= 255;
		if (r > 0.04045) {
			r = Math.pow((r + 0.055) / 1.055, 2.4);
		} else {
			r /= 12.92;
		}
		if (g > 0.04045) {
			g = Math.pow((g + 0.055) / 1.055, 2.4);
		} else {
			g /= 12.92;
		}
		if (b > 0.04045) {
			b = Math.pow((b + 0.055) / 1.055, 2.4);
		} else {
			b /= 12.92;
		}
		x = r * 0.4124 + g * 0.3576 + b * 0.1805;
		y = r * 0.2126 + g * 0.7152 + b * 0.0722;
		z = r * 0.0193 + g * 0.1192 + b * 0.9505;
		return {
			x : x * 100,
			y : y * 100,
			z : z * 100
		};
	};
	Convert.xyzToRGB = function(x, y, z) {
		var b, g, r;
		x /= 100;
		y /= 100;
		z /= 100;
		r = (3.2406 * x) + (-1.5372 * y) + (-0.4986 * z);
		g = (-0.9689 * x) + (1.8758 * y) + (0.0415 * z);
		b = (0.0557 * x) + (-0.2040 * y) + (1.0570 * z);
		if (r > 0.0031308) {
			r = (1.055 * Math.pow(r, 0.4166666667)) - 0.055;
		} else {
			r *= 12.92;
		}
		if (g > 0.0031308) {
			g = (1.055 * Math.pow(g, 0.4166666667)) - 0.055;
		} else {
			g *= 12.92;
		}
		if (b > 0.0031308) {
			b = (1.055 * Math.pow(b, 0.4166666667)) - 0.055;
		} else {
			b *= 12.92;
		}
		return {
			r : r * 255,
			g : g * 255,
			b : b * 255
		};
	};
	Convert.xyzToLab = function(x, y, z) {
		var a, b, l, whiteX, whiteY, whiteZ;
		if (typeof x === "object") {
			y = x.y;
			z = x.z;
			x = x.x;
		}
		whiteX = 95.047;
		whiteY = 100.0;
		whiteZ = 108.883;
		x /= whiteX;
		y /= whiteY;
		z /= whiteZ;
		if (x > 0.008856451679) {
			x = Math.pow(x, 0.3333333333);
		} else {
			x = (7.787037037 * x) + 0.1379310345;
		}
		if (y > 0.008856451679) {
			y = Math.pow(y, 0.3333333333);
		} else {
			y = (7.787037037 * y) + 0.1379310345;
		}
		if (z > 0.008856451679) {
			z = Math.pow(z, 0.3333333333);
		} else {
			z = (7.787037037 * z) + 0.1379310345;
		}
		l = 116 * y - 16;
		a = 500 * (x - y);
		b = 200 * (y - z);
		return {
			l : l,
			a : a,
			b : b
		};
	};
	Convert.labToXYZ = function(l, a, b) {
		var x, y, z;
		if (typeof l === "object") {
			a = l.a;
			b = l.b;
			l = l.l;
		}
		y = (l + 16) / 116;
		x = y + (a / 500);
		z = y - (b / 200);
		if (x > 0.2068965517) {
			x = x * x * x;
		} else {
			x = 0.1284185493 * (x - 0.1379310345);
		}
		if (y > 0.2068965517) {
			y = y * y * y;
		} else {
			y = 0.1284185493 * (y - 0.1379310345);
		}
		if (z > 0.2068965517) {
			z = z * z * z;
		} else {
			z = 0.1284185493 * (z - 0.1379310345);
		}
		return {
			x : x * 95.047,
			y : y * 100.0,
			z : z * 108.883
		};
	};
	Convert.rgbToLab = function(r, g, b) {
		var xyz;
		if (typeof r === "object") {
			g = r.g;
			b = r.b;
			r = r.r;
		}
		xyz = this.rgbToXYZ(r, g, b);
		return this.xyzToLab(xyz);
	};
	Convert.labToRGB = function(l, a, b) {
	};
	return Convert;
})();