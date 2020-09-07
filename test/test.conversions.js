
//Dummy sketch because p5.js global mode does not work with mocha for some reason
const myP5 = new p5(_ => {
	function setup(){}
	function draw(){}
})

const EPSILON = 1e-6

function compareColors(c1, c2) {
	chai.assert(
		Math.abs(c1[0] - c2[0]) < EPSILON && 
		Math.abs(c1[1] - c2[1]) < EPSILON &&
		Math.abs(c1[2] - c2[2]) < EPSILON,
		c1 + " != " + c2
	)
}

function normsRGB(r, g, b){
	return [r / 255.0, g / 255.0, b / 255.0]
}

describe("Color space conversions", function(){
	describe("CIEXYZ to sRGB", function(){
		it("XYZ2sRGB(0.44, 0.70, 0.70)", function(){
			compareColors(myP5.XYZ2sRGB(0.44, 0.70, 0.70), [0.010736751704976056, 0.9620347237967731, 0.8103815701195073])
		})
		it("XYZ2sRGB(0.0128, 0.0077, 0.0337)", function(){
			compareColors(myP5.XYZ2sRGB(0.0128, 0.0077, 0.0337), [0.11687084491693031, 0.0442585198754848, 0.20524130395536044])
		})
		it("XYZ2sRGB(0.8518, 0.9097, 0.726)", function(){
			compareColors(myP5.XYZ2sRGB(0.8518, 0.9097, 0.726), [1.0000480484018812, 0.959873485302423, 0.8147837958304412])
		})
	})
	describe("CIEXYZ to CIELab", function(){
		it("XYZ2Lab(0.44, 0.70, 0.70)", function(){
			compareColors(myP5.XYZ2Lab(0.44, 0.70, 0.70), [86.99686420214168, -57.165004554587284, 4.967342179754186])
		})
		it("XYZ2Lab(0.0128, 0.0077, 0.0337)", function(){
			compareColors(myP5.XYZ2Lab(0.0128, 0.0077, 0.0337), [6.955381481481481, 20.011652956918798, -23.21582233759244])
		})
		it("XYZ2Lab(0.8518, 0.9097, 0.726)", function(){
			compareColors(myP5.XYZ2Lab(0.8518, 0.9097, 0.726), [96.39769045798434, -2.4138158854643543, 19.06447104401854])
		})
	})
	describe("sRGB to CIEXYZ", function(){
		it("sRGB2XYZ(0.0107, 0.9620, 0.8104)", function(){
			compareColors(myP5.sRGB2XYZ(0.010736751704976056, 0.9620347237967731, 0.8103815701195073), [0.44, 0.70, 0.70])
		})
		it("sRGB2XYZ(0.1169, 0.0443, 0.2052)", function(){
			compareColors(myP5.sRGB2XYZ(0.11687084491693031, 0.0442585198754848, 0.20524130395536044), [0.0128, 0.0077, 0.0337])
		})
		it("sRGB2XYZ(1.0000, 0.9599, 0.8148)", function(){
			compareColors(myP5.sRGB2XYZ(1.0000480484018812, 0.959873485302423, 0.8147837958304412), [0.8518, 0.9097, 0.726])
		})
	})
	describe("CIELAB to CIEXYZ", function(){
		it("Lab2XYZ(86.9968, -57.1650, 4.9673)", function(){
			compareColors(myP5.Lab2XYZ(86.99686420214168, -57.165004554587284, 4.967342179754186), [0.44, 0.70, 0.70])
		})
		it("Lab2XYZ(6.9554, 20.0117, -23.2158)", function(){
			compareColors(myP5.Lab2XYZ(6.955381481481481, 20.011652956918798, -23.21582233759244), [0.0128, 0.0077, 0.0337])
		})
		it("Lab2XYZ(96.3980, -2.4138, 19.0645)", function(){
			compareColors(myP5.Lab2XYZ(96.39769045798434, -2.4138158854643543, 19.06447104401854), [0.8518, 0.9097, 0.726])
		})
	})
	
	//TODO CIELuv
})