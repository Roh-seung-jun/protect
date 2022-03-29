<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Area extends Model
{
    protected $guarded = [];
    public $timestamps = false;
    protected $keyType = 'string';
    public $incrementing =false;

    public function maps(){
        return $this->hasMany('App\Map');
    }
}
