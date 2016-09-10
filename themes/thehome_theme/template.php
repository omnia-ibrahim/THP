<?php

function thehome_theme_preprocess_page(&$vars, $hook) {

 // Do we have a node?
  if (isset($vars['node'])) {

    // Ref suggestions cuz it's stupid long.
    $suggests = &$vars['theme_hook_suggestions'];

    // Get path arguments.
    $args = arg();
    // Remove first argument of "node".
    unset($args[0]);

    // Set type.
    $type = "page__type_{$vars['node']->type}";

    // Bring it all together.
    $suggests = array_merge(
      $suggests,
      array($type),
      theme_get_suggestions($args, $type)
    );

    // if the url is: 'http://domain.com/node/123/edit'
    // and node type is 'blog'..
    //
    // This will be the suggestions:
    //
    // - page__node
    // - page__node__%
    // - page__node__123
    // - page__node__edit
    // - page__type_blog
    // - page__type_blog__%
    // - page__type_blog__123
    // - page__type_blog__edit
    //
    // Which connects to these templates:
    //
    // - page--node.tpl.php
    // - page--node--%.tpl.php
    // - page--node--123.tpl.php
    // - page--node--edit.tpl.php
    // - page--type-blog.tpl.php          << this is what you want.
    // - page--type-blog--%.tpl.php
    // - page--type-blog--123.tpl.php
    // - page--type-blog--edit.tpl.php
    //
    // Latter items take precedence.
  }
//print_r($vars['theme_hook_suggestions']);
}

/**
 *
 */
/*
function thehome_theme_image_formatter($variables) {
  global $user;
  $item = $variables['item'];
  $image_nid = db_query("SELECT entity_id FROM {field_data_field_design_image} WHERE field_design_image_fid = :fid", array(':fid' => $item['fid']))->fetchAssoc();
 $image = array(
    'path' => $item['uri'],
    'alt' => $item['alt'],
  );
  if ($variables['image_style']) {
    $image['style_name'] = $variables['image_style'];
    $output = theme('image_style', $image); // Here you should add attribute, check that it's your field.
  }
  else {
    $output = theme('image', $image);
  }
  $out = "";
  if (!empty($image_nid) && $image_nid['entity_id'] != arg(1)) {

  
   $image_node = node_load($image_nid['entity_id']);
 // $output = l($output, 'node/' . $image_nid['entity_id'], array('html' => true));  // Here you should add attribute, check that it's your field. Or just take upper code.
  
  if ($user->uid == $image_node->uid) {
     $out = "<a href='"  . base_path() . '/node/' . $image_nid['entity_id'] . "/edit/lightbox2' rel='lightmodal'>" . t('Edit') . "</a>"; 
  }
  $out .= "<a href='"  . base_path() . '/node/' . $image_nid['entity_id'] . "/lightbox2' rel='lightmodal[xxx_" . arg(1). "]'>" . $output . "</a>";
  return "<div class='image_inside_album'>" . $out . "<span>" . "<a href='"  . base_path() . '/node/' . $image_nid['entity_id'] . "/edit/lightbox2' rel='lightmodal'>" . $image_node->title . "</a>". " </span></div>";
  } else {
      
    return "<div class='image_inside_album'>" . $output . "</div>";
  }
}
*/
/**
 *
 */
function thehome_theme_fboauth_action__connect($variables) {
  $action = $variables['action'];
  $link = $variables['properties'];
  $url = url($link['href'], array('query' => $link['query']));
  $link['attributes']['class'] = isset($link['attributes']['class']) ? $link['attributes']['class'] : 'facebook-action-connect';
  $link['attributes']['rel'] = 'nofollow';
  $attributes = isset($link['attributes']) ? drupal_attributes($link['attributes']) : '';
  $title = isset($link['title']) ? check_plain($link['title']) : '';
  //$src = ($GLOBALS['is_https'] ? 'https' : 'http') . '://www.facebook.com/images/fbconnect/login-buttons/connect_light_medium_short.gif';
  $src = base_path() . drupal_get_path('module', 'thp_profiles') . '/images/facebook_signup.png';
  return '<a ' . $attributes . ' href="' . $url . '"><img src="' . $src . '" alt="' . $title . '" /></a>';
}

