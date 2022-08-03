<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Order;
use App\Models\Product;
use App\Models\Shippingdetail;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    // Register
    public function register(Request $request)
    {
        $existingUser = User::where('email', $request->email)->get()->first();

        if ($existingUser) {
            return response([
                'status' => 0,
                'message' => 'email already registered',
            ], 409);
        } else {
            $result = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
            ]);
            $token = $result->createToken('auth_token')->plainTextToken;
            return response([
                'status' => 1,
                'id' => $result->id,
                'name' => $result->name,
                'email' => $result->email,
                'mobile' => $result->mobile,
                'token' => $token,
            ], 200);
        }
    }

    // Login
    public function login(Request $request)
    {
        $email = $request->email;
        $password = $request->password;

        $result = User::where(['email' => $email])->first();
        if ($result) {
            if (Hash::check($password, $result->password)) {
                $token = $result->createToken('auth_token')->plainTextToken;
                return response([
                    'status' => 1,
                    'id' => $result->id,
                    'name' => $result->name,
                    'email' => $result->email,
                    'mobile' => $result->mobile,
                    'token' => $token,
                ], 200);

            } else {
                return response([
                    'status' => 0,
                    'message' => 'Incorrect Password',
                ], 409);
            }
        } else {
            return response([
                'status' => 0,
                'message' => 'Enter valid credentials',
            ], 401);
        }
    }

    //  All Categories
    public function allCategories(Request $request, $id = "")
    {
        $data = Category::get();

        return response($data);
    }

    //  All Products
    public function allProducts(Request $request, $id = "")
    {
        if ($id) {
            $data = Product::join('categories', 'products.cat_id', '=', 'categories.id')
                ->where('cat_id', $id)
                ->get([
                    'products.id as id', 'products.name as name', 'description', 'products.image as image',
                    'categories.name as cat_name', 'cat_id', 'price',
                ]);
        } else {
            $data = Product::join('categories', 'products.cat_id', '=', 'categories.id')->get([
                'products.id as id', 'products.name as name', 'description', 'products.image as image',
                'categories.name as cat_name', 'cat_id', 'price',
            ]);
        }

        return response($data);
    }

    //  single Product
    public function singleProducts(Request $request, $id)
    {
        $data = Product::join('categories', 'products.cat_id', '=', 'categories.id')
            ->where('products.id', $id)
            ->get([
                'products.id as id', 'products.name as name', 'description', 'products.image as image',
                'categories.name as cat_name', 'cat_id', 'price',
            ])->first();

        return response($data);
    }

    // Order Food
    public function order(Request $request)
    {
        $model = new Order;
        $model->fill($request->all());
        $model->save();

        return response([
            'status' => 1,
            'message' => 'successfully ordered',
        ]);
    }

    //  All Orders
    public function allOrder(Request $request, $id = "")
    {
        if ($id) {
            $data = Order::join('products', 'orders.product_id', '=', 'products.id')
                ->join('categories', 'products.cat_id', '=', 'categories.id')
                ->join('order_status', 'orders.status', '=', 'order_status.id')
                ->where('user_id', auth()->id())
                ->where('orders.id', $id)
                ->get([
                    'products.id as id', 'products.name as name', 'description', 'products.image as image',
                    'categories.name as cat_name', 'cat_id', 'price', 'order_status.name as order_status', 'qty', 'orders.created_at',
                ])->first();
        } else {
            $data = Order::join('products', 'orders.product_id', '=', 'products.id')
                ->join('categories', 'products.cat_id', '=', 'categories.id')
                ->join('order_status', 'orders.status', '=', 'order_status.id')
                ->where('user_id', auth()->id())
                ->get([
                    'products.id as id', 'products.name as name', 'description', 'products.image as image',
                    'categories.name as cat_name', 'cat_id', 'price', 'order_status.name as order_status', 'qty', 'orders.created_at',
                ]);
        }

        return response($data);
    }

    // add address
    public function shippingaddress(Request $request)
    {
        $existingAddress = Shippingdetail::get()->where('user_id', $request->user_id);

        if (count($existingAddress) >= 2) {
            return response([
                'status' => 0,
                'message' => 'user can only have two address',
            ], 403);
        }

        $model = new Shippingdetail;
        $model->fill($request->all());
        $model->save();

        return response([
            'status' => 1,
            'message' => 'successfully added',
        ]);
    }

    // get address
    public function getshippingaddress(Request $request)
    {
        $data = Shippingdetail::get()->where('user_id', auth()->id());

        return response($data);
    }

    // delete address
    public function deleteshippingaddress(Request $request, $id)
    {
        $data = Shippingdetail::where('id', $id)->delete();
        if ($data == 0) {
            return response([
                'status' => 0,
                'message' => 'failed to delete',
            ], 400);

        } else {
            return response([
                'status' => 1,
                'message' => 'successfully deleted',
            ]);

        }

    }

    // get profile
    public function profile(Request $request)
    {
        $data = User::get()->where('id', auth()->id())->first();
        $shippingDetails = Shippingdetail::get()->where('user_id', auth()->id());
        $data->shippingDetails = $shippingDetails;

        return response($data);
    }
}
