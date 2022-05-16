<?php

    header('Content-Type: application/json ');
    
    $conexion = mysqli_connect("localhost","root","","funcho");

    function registrarUsuario($link, $nombre, $apellido, $email, $contrasena){
        if (mysqli_query($link, "insert into familia (nombre,apellidos,correo,contraseña) values ('".$nombre."','".$apellido."', '".$email."', '".$contrasena."');")) {
            $all = 'true';
        }else{
            $all = 'false';
        }
        return $all;
    }

    function crearPerfil($link, $nombre, $avatar, $idCuenta){
        if (mysqli_query($link, "insert into integrantes (avatar, nombre, idCuenta) values ('".$avatar."','".$nombre."', '".$idCuenta."');")) {
            $all = 'true';
        }else{
            $all = 'false';
        }
        return $all;
    }

    function validarDatos($link, $email, $contrasena){
        $res = 'false';
        $valor  = mysqli_query($link, "SELECT * FROM familia WHERE familia.correo='$email' and familia.contraseña='$contrasena'");
        $all = mysqli_fetch_array($valor);
        return $all;
    }

    function listarIntegrantes($link, $idCuenta){
        $valor = mysqli_query($link, "SELECT * FROM integrantes WHERE integrantes.idCuenta='$idCuenta'");
        $all = array();
        while($fila = mysqli_fetch_array($valor)){
            $all[] = $fila;
        }
        return $all; 
    }

    function listarOrden($link, $idCuenta){
        $valor = mysqli_query($link, "SELECT * FROM integrantes WHERE integrantes.idCuenta='$idCuenta' ORDER BY puntos DESC");
        $all = array();
        while($fila = mysqli_fetch_array($valor)){
            $all[] = $fila;
        }
        return $all; 
    }

    function get_Integrante($link, $id){
        $valor = mysqli_query($link, "SELECT * FROM integrantes WHERE integrantes.idIntegrante='$id'");
        $all = mysqli_fetch_array($valor);
        return $all;  
    }

    function editarPerfil($link, $id, $name, $avatar){
        
            if (mysqli_query($link, "UPDATE integrantes SET nombre='".$name."', avatar='".$avatar."' WHERE integrantes.idIntegrante='".$id."'")) {
                $all = 'true';
            }else{
                $all = 'false';
            }
        
        return $all;
    }

    function crearTarea($link, $name, $description, $points, $time){
        if (mysqli_query($link, "insert into tareas (nombre, descripcion, puntos, tiempo) values ('".$name."','".$description."', '".$points."', '".$time."');")) {
            $all = 'true';
        }else{
            $all = 'false';
        }
        return $all;
    }

    function agregarTarea($link, $idIntegrante, $idTarea, $type){
        if (mysqli_query($link, "insert into integrantesactividades (idIntegrante, idTarea, type) values ('".$idIntegrante."','".$idTarea."', '".$type."');")) {
            $all = 'true';
        }else{
            $all = 'false';
        }
        return $all;
    }

    function agregarReceta($link, $idReceta, $nombre, $ingredientes, $instrucciones, $puntos){
        if (mysqli_query($link, "insert into recetas (idReceta, nombre, ingredientes, instrucciones, puntos) values ('".$idReceta."','".$nombre."', '".$ingredientes."', '".$instrucciones."', '".$puntos."');")) {
            $all = 'true';
        }else{
            $all = 'false';
        }
        return $all;
    }

    function listarTareas($link){
        $valor = mysqli_query($link, "SELECT * FROM tareas");
        $all = array();
        while($fila = mysqli_fetch_array($valor)){
            $all[] = $fila;
        }
        return $all;  
    }

    function listarActividades($link, $id){
        $valor = mysqli_query($link, "SELECT * FROM integrantesactividades where integrantesactividades.idIntegrante='$id'");
        $all = array();
        while($fila = mysqli_fetch_array($valor)){
            $all[] = $fila;
        }
        return $all;  
    }

    function getTarea($link, $id){
        $valor = mysqli_query($link, "SELECT * FROM tareas WHERE tareas.idTarea='$id'");
        $all = mysqli_fetch_array($valor);
        return $all;
    }

    function getReceta($link, $id){
        $valor = mysqli_query($link, "SELECT * FROM recetas WHERE recetas.idReceta='$id'");
        $all = mysqli_fetch_array($valor);
        return $all;
    }

    function sumarPuntos($link, $puntos, $id){
        if(mysqli_query($link, "UPDATE integrantes SET puntos = puntos + '$puntos' where integrantes.idIntegrante='$id'")){
            $all = 'true';
        }else{
            $all = 'false';
        }

        return $all;
    }

    function eliminarActividad($link, $id, $idTarea)
    {
        if (mysqli_query($link, "DELETE FROM integrantesactividades WHERE integrantesactividades.idIntegrante='$id' and integrantesactividades.idTarea='$idTarea'")) {
            $all = 'success';
        }else{
            $all = 'Not success';
        }
        return $all;
    }


    
    //http://localhost:85/Pasteleria/API/bakery/
    if($_GET['peticion']=='listar' && $_SERVER['REQUEST_METHOD'] == 'GET'){
        $resultado = listarIntegrantes($conexion, $_GET['detalle']);
        echo json_encode($resultado);
    }else if($_GET['peticion']=='listaActividades' && $_SERVER['REQUEST_METHOD'] == 'GET'){
        $resultado = listarActividades($conexion, $_GET['detalle']);
        echo json_encode($resultado);
    }else if($_GET['peticion']=='listaOrden' && $_SERVER['REQUEST_METHOD'] == 'GET'){
        $resultado = listarOrden($conexion, $_GET['detalle']);
        echo json_encode($resultado);
    }else if($_GET['peticion']=='lista' && $_GET['detalle']=='tareas' && $_SERVER['REQUEST_METHOD'] == 'GET'){
        $resultado = listarTareas($conexion);
        echo json_encode($resultado);
    }else if($_GET['peticion']=='integrante' && $_SERVER['REQUEST_METHOD'] == 'GET'){
        $resultado = get_Integrante($conexion, $_GET['detalle']);
        echo json_encode($resultado);
    }else if($_GET['peticion']=='receta' && $_SERVER['REQUEST_METHOD'] == 'GET'){
        $resultado = getReceta($conexion, $_GET['detalle']);
        echo json_encode($resultado);
    }else if($_GET['peticion']=='tarea' && $_SERVER['REQUEST_METHOD'] == 'GET'){
        $resultado = getTarea($conexion, $_GET['detalle']);
        echo json_encode($resultado);
    }else if($_GET['peticion']=='tarea' && $_GET['detalle']=='add' && $_SERVER['REQUEST_METHOD'] == 'POST'){
        $resultado = crearTarea($conexion, $_POST['nameWork'], $_POST['description'], $_POST['points'], $_POST['time']);
        echo json_encode($resultado);
    }else if($_GET['peticion']=='familia' && $_GET['detalle']=='add' && $_SERVER['REQUEST_METHOD'] == 'POST'){
        $resultado = registrarUsuario($conexion, $_POST['name'], $_POST['lastName'], $_POST['email'], $_POST['password']);
        echo json_encode($resultado);
    }else if($_GET['peticion']=='perfil' && $_GET['detalle']=='add' && $_SERVER['REQUEST_METHOD'] == 'POST'){
        $resultado = crearPerfil($conexion, $_POST['name'], $_POST['avatar'], $_POST['idCuenta']);
        echo json_encode($resultado);
    }else if($_GET['peticion']=='validar' && $_GET['detalle']=='login' && $_SERVER['REQUEST_METHOD'] == 'POST'){
        $resultado = validarDatos($conexion, $_POST['email'], $_POST['password']);
        echo json_encode($resultado);
    }else if($_GET['peticion']=='actividad' && $_GET['detalle']=='add' && $_SERVER['REQUEST_METHOD'] == 'POST'){
        $resultado = agregarTarea($conexion, $_POST['idIntegrante'], $_POST['idTarea'], $_POST['type']);
        echo json_encode($resultado);
    }else if($_GET['peticion']=='receta' && $_GET['detalle']=='add' && $_SERVER['REQUEST_METHOD'] == 'POST'){
        $resultado = agregarReceta($conexion, $_POST['idReceta'], $_POST['nombre'], $_POST['ingredientes'], $_POST['instrucciones'], $_POST['puntos']);
        echo json_encode($resultado);
    }else if($_GET['peticion']=='perfil' && $_POST['methodHTTP'] == 'PUT'){
        $resultado = editarPerfil($conexion, $_GET['detalle'], $_POST['name'], $_POST['avatar']);
        echo json_encode($resultado);
    }else if($_GET['peticion']=='sumarPuntos' && $_POST['methodHTTP'] == 'PUT'){
        $resultado = sumarPuntos($conexion, $_POST['puntos'], $_GET['detalle']);
        echo json_encode($resultado);
    }else if($_GET['peticion']=='eliminar' && $_POST['methodHTTP'] == 'DELETE'){
        $resultado = eliminarActividad($conexion, $_GET['detalle'], $_POST['idTarea']);
        echo json_encode($resultado);
    }else{
        header('HTTP/1.1 405 Method Not Allowed');
        exit;
    }       

    mysqli_close($conexion);
    
?>