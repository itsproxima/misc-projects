@extends('layout')

@section('content')
        

        <div class="row">
            <div class="col-lg-12 ">
                <form action="{{route('todo.save',['id'=> $todo->id])}}" method="post">
                        {{  csrf_field()  }}
                      <input type="text" class="form-control input-lg" value="{{$todo->todo}}" placeholder="create new todo" name="todo">
                    }
                    }
 
                </form>
                

            </div>
            

        </div>

        
@stop