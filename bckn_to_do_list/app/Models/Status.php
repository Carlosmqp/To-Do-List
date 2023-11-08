<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Status extends Model
{
    use HasFactory;


    protected $table = 'estado';

    protected $fillable = [
        'nombre',
        'tarea_id'
    ];

    // -------------------------------------- RELATIONS MODELS --------------------------------------------//
    public function homeworkID()
    {
        return $this->belongsTo(Homework::class, 'tarea_id');
    }

}
