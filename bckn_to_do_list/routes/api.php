<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\HomeworkController;
use App\Http\Controllers\TagController;

Route::controller(AuthController::class)->group(function () {
    Route::post('login', 'login');
    Route::post('register', 'register');
    Route::post('logout', 'logout');
    Route::post('refresh', 'refresh');
    Route::get('me', 'me');
    Route::post('tareas', 'tareas');
});

Route::controller(HomeworkController::class)->group(function () {
    Route::get('getHomeworks', 'show');
    Route::post('createHomework', 'create');
    Route::put('updateHomework/{id}', 'update');
    Route::delete('deleteHomework/{id}', 'destroy');
});

Route::controller(TagController::class)->group(function () {
    Route::get('getTags', 'show');
    Route::post('createTag', 'create');
    Route::put('updateTag/{id}', 'update');
    Route::delete('deleteTag/{id}', 'destroy');
});

