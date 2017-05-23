<?php 
	function createHtmlTag($tag = "") {
		return "<h1>$tag</h1><br/>"
	}
	createHtmlTag("hello");



	createHtmlTag("JSON 和 serialize 对比");

	$member = array ("username","age");

	var_dump($member);
 ?>