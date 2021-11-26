# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2021_11_25_193821) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "accounts", force: :cascade do |t|
    t.float "cash_balance"
    t.float "stock_balance"
    t.float "total_balance"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.bigint "user_id", null: false
    t.integer "referral_bonus"
    t.boolean "signup_bonus"
    t.index ["user_id"], name: "index_accounts_on_user_id"
  end

  create_table "portfolios", force: :cascade do |t|
    t.string "ticker"
    t.float "quantity"
    t.float "current_spot_price"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.bigint "account_id", null: false
    t.index ["account_id"], name: "index_portfolios_on_account_id"
  end

  create_table "referrals", force: :cascade do |t|
    t.string "recipient_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.bigint "user_id", null: false
    t.index ["user_id"], name: "index_referrals_on_user_id"
  end

  create_table "transactions", force: :cascade do |t|
    t.string "ticker"
    t.integer "trade"
    t.float "quantity"
    t.float "settled_price"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.bigint "account_id", null: false
    t.index ["account_id"], name: "index_transactions_on_account_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "first_name"
    t.string "last_name"
    t.string "email"
    t.string "password_digest"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "referral_code"
  end

  create_table "watchlists", force: :cascade do |t|
    t.string "ticker"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.bigint "user_id", null: false
    t.index ["user_id"], name: "index_watchlists_on_user_id"
  end

  add_foreign_key "accounts", "users"
  add_foreign_key "portfolios", "accounts"
  add_foreign_key "referrals", "users"
  add_foreign_key "transactions", "accounts"
  add_foreign_key "watchlists", "users"
end
