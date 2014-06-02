/*!
 *
 * jquery.fancytree.wide.js
 * Support for 100% wide selection bars.
 * (Extension module for jquery.fancytree.js: https://github.com/mar10/fancytree/)
 *
 * Copyright (c) 2014, Martin Wendt (http://wwWendt.de)
 *
 * Released under the MIT license
 * https://github.com/mar10/fancytree/wiki/LicenseInfo
 *
 * @version @VERSION
 * @date @DATE
 */

;(function($, window, document, undefined) {

"use strict";

var reNumUnit = /^([+-]?(?:\d+|\d*\.\d+))([a-z]*|%)$/; // split "1.5em" to ["1.5", "em"]

/*******************************************************************************
 * Private functions and variables
 */

/*******************************************************************************
 * Extension code
 */
$.ui.fancytree.registerExtension({
	name: "wide",
	version: "0.0.3",
	// Default options for this extension.
	options: {
		// autoResize: true,  // call wideUpdate() on window.resize events
		// cheap: false,      // true: use static css only
		// margin: {left: 3, right: 3} // free margins near the selection bar
		iconWidth: null,  // Adjust this if @fancy-icon-width != "16px"
		iconSpacing: null, // Adjust this if @fancy-icon-spacing != "3px"
		levelOfs: null    // Adjust this if ul padding != "16px"
	},

	treeCreate: function(ctx){
		this._super(ctx);
		this.$container.addClass("fancytree-ext-wide");

		var iconSpacingUnit, iconWidthUnit, levelOfsUnit,
			instOpts = ctx.options.wide,
			// css sniffing
			$dummyLI = $("<li id='fancytreeTemp'><span class='fancytree-node'><span class='fancytree-icon' /><span class='fancytree-title' /></span><ul />")
				.appendTo(ctx.tree.$container),
			$dummyIcon = $dummyLI.find(".fancytree-icon"),
			$dummyUL = $dummyLI.find("ul"),
			// $dummyTitle = $dummyLI.find(".fancytree-title"),
			iconSpacing = instOpts.iconSpacing || $dummyIcon.css("margin-left"),
			iconWidth = instOpts.iconWidth || $dummyIcon.css("width"),
			levelOfs = instOpts.levelOfs || $dummyUL.css("padding-left");

		$dummyLI.remove();

		iconSpacingUnit = iconSpacing.match(reNumUnit)[2];
		iconSpacing = parseFloat(iconSpacing, 10);
		iconWidthUnit = iconWidth.match(reNumUnit)[2];
		iconWidth = parseFloat(iconWidth, 10);
		levelOfsUnit = levelOfs.match(reNumUnit)[2];
		if( iconSpacingUnit !== iconWidthUnit || levelOfsUnit !== iconWidthUnit ) {
			$.error("iconWidth, iconSpacing, and levelOfs must have the same css measure unit");
		}
		this._local.measureUnit = iconWidthUnit;
		this._local.levelOfs = parseFloat(levelOfs);
		this._local.lineOfs = (ctx.options.checkbox ? 3 : 2) * (iconWidth + iconSpacing) + iconSpacing;
	},
	// treeDestroy: function(ctx){
	// 	this._super(ctx);
	// },
	nodeRenderTitle: function(ctx) {
		var res,
			inst = this._local,
//			instOpts = ctx.options.wide,
			node = ctx.node;

		res = this._super(ctx);

		$(node.span).find(".fancytree-title").css({
			paddingLeft: ((node.getLevel() - 1) * inst.levelOfs + inst.lineOfs) + inst.measureUnit
		});
		return res;
	}
});
}(jQuery, window, document));
