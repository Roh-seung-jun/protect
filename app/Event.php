<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Event extends Model
{

    protected $guarded = [];
    public $timestamps = false;
    protected $primaryKey = 'phone';
    protected $keyType = 'string';
}
