import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import Post from "./postModel.js";
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  console.warn("THIS IS PRE_SAVE RUNNING");
  if (!this.isModified("password")) {
    console.log("this is not running...");
    next();
  }
  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
  console.log("this.password: ", this.password);
});

userSchema.post("save", async function () {
  try {
    const commonPost = new Post({
      title: "Todoist ကနေကြိုဆိုပါတယ်နော်... 🎉",
      content: `
      <h1><strong>Todoist ကိုဘယ်လိုအသုံးပြုရမလဲ? ℹ️</strong></h1><p>မင်္ဂလာပါ ${this.name}
      </p><p>Todoist ကိုအသုံးပြုဖို့ဆိုတာအရမ်းကိုမှလွယ်ကူရိုးရှင်းပါတယ်။ <br>ဒီ Application ကိုကျွန်တော်စတင်တည်ဆောက်တုန်းက ရိုးရှင်းပြီး၊</p><p>စိတ်ချရတဲ့ <strong>အွန်လိုင်းမှတ်စုစာအုပ်</strong> ပုံစံဖြစ်အောင်ကြိုးစားတည်ဆောက်ခဲ့တာဖြစ်ပါတယ်။<br><br class="ProseMirror-trailingBreak"></p><pre><code>  " အသက်ရှိစဉ်၊ မသေခင်ကို၊
      ကောက်လျင်ကြီးဆန်၊
      နီတာလန်နှင့်၊ ငါးသန်သေးနုပ်
      ရေလုံပြုပ်များကို၊ တလုပ်ကယ်၀၀
      စားလိုက်ရလျှင်ဖြင့်၊ အာဂပါးစပ်
      လူဖြစ်ကျိုးနပ်လေငဲ့။....။   "
     
      ~ ရေသည်ပြဇာတ် | အခန်း (၁)၊ အပိုဒ် (၁) |</code></pre><p><br><br class="ProseMirror-trailingBreak"></p><p><br><br class="ProseMirror-trailingBreak"></p><p><br><br class="ProseMirror-trailingBreak"></p><p><br><br class="ProseMirror-trailingBreak"></p><p><br><br class="ProseMirror-trailingBreak"></p> `,
      dateCreated: new Date().toISOString(),
      dateUpdated: new Date().toISOString(),
      userId: this._id,
    });

    await commonPost.save();
  } catch (error) {
    console.error("Error creating common post:", error);
  }
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  if (enteredPassword) {
    const isPasswordValid = await bcrypt.compare(
      enteredPassword,
      this.password
    );
    if (isPasswordValid) {
      return true;
    }
    return false;
  }

  return false;
};

const User = mongoose.model("User", userSchema);

export default User;
