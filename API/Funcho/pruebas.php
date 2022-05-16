<?php
    $object = new stdClass();
    $object->property = 'I am an object\'s property';
    echo json_encode($object);
?>