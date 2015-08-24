<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Topic extends Model
{
  protected $fillable = ['lists_id', 'name', 'status', 'sorter'];
  public function comments()
  {
      return $this->hasMany('App\Comment');
  }
}
