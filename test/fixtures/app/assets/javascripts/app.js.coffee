###
= require jquery/dist/jquery
= require bootstrap/js/modal
= require_tree ./templates
###

$ ->
  $dialog = $ JST["templates/modal"]()

  $(".btn.btn-modal").click ->
    $dialog.modal()

