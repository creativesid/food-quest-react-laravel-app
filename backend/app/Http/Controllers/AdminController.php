<?php

namespace App\Http\Controllers;

use App\Models\Admin;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AdminController extends Controller
{
    // Register
    public function register(Request $request)
    {
        Admin::create([
            'name' => 'siddharth pandey',
            'email' => 'admin@company.com',
            'password' => Hash::make('admin'),
        ]);
    }

    // Login
    public function login(Request $request)
    {
        $email = $request->email;
        $password = $request->password;

        $result = Admin::where(['email' => $email])->first();
        if ($result) {
            if (Hash::check($password, $result->password)) {
                $token = $result->createToken('auth_token')->plainTextToken;
                return response([
                    'status' => 1,
                    'name' => $result->name,
                    'email' => $result->email,
                    'token' => $token,
                ], 200);

            } else {
                return response([
                    'status' => 0,
                    'message' => 'Incorrect Password',
                ]);
            }
        } else {
            return response([
                'status' => 0,
                'message' => 'Enter valid credentials',
            ]);
        }
    }

    // add category
    public function addCategory(Request $request)
    {
        $data = array(
            'name' => $request->name,
        );

        if ($request->hasFile('image')) {
            $image = cloudinary()->upload($request->file('image')->getRealPath())->getSecurePath();
            $data['image'] = $image;
        }

        Category::create($data);
        return response([
            'status' => 1,
            'message' => 'Category added',
        ]);
    }

    // add product
    public function addProduct(Request $request)
    {
        // $model = new Product;
        // $model->fill($request->all());
        // $res = $model->save();
        // return $res;
        $data = array(
            'name' => $request->name,
            'description' => $request->description,
            'price' => $request->price,
            'cat_id' => $request->cat_id,
        );

        if ($request->hasFile('image')) {
            $image = cloudinary()->upload($request->file('image')->getRealPath())->getSecurePath();
            $data['image'] = $image;
        }

        Product::create($data);
        return response([
            'status' => 1,
            'message' => 'Product added',
        ]);
    }
}
