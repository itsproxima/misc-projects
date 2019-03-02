<?php

namespace App\Http\Controllers;

use App\Todo;
use Illuminate\Http\Request;

class TodosController extends Controller
{
    public function index(){
    	$todos= Todo::all();

    	return view('todos')->with('todos',$todos);
    }

    public function store(Request $request){

    		//dd($request->all());

    		$todo= new Todo;
    		$todo->todo= $request->todo;
    		$todo->save();

    		return redirect()->back();
    }

    public function delete($id){

    	//dd($id);
    	$todo= Todo::find($id);
    	$todo->delete();
    	return redirect()->back();
    }
    public function update($id){
    	$todo= Todo::find($id);
    	return view('update')->with('todo',$todo) ;
    }


    public function save(Request $request,$id){

    	//dd($request->all());
    	$todo= Todo::find($id);
    	$todo->todo =$request->todo;
    	$todo->save();

    	return redirect()->route('todos');
    }
}
