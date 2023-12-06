import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from 'react-router-dom';
import * as z from "zod";

import {
  Form
} from "@/components/ui/form";


import { useCheckAuthUser } from '@/lib/react-query/queriesAndMutations';


import { useCreateUserAccount, useSignInAccount } from "@/lib/react-query/queriesAndMutations";
import { SignupValidation } from "@/lib/validation";
import { Loader } from "lucide-react";
import { useForm } from "react-hook-form";

const SignupForm = () => {
  const { toast } = useToast();
  const navigate= useNavigate();

  const { mutateAsync: createUserAccount, isPending: isCreatingUser } = useCreateUserAccount();
  const { mutateAsync: signInAccount } = useSignInAccount();
  const { data: isLoggedIn, isLoading: isCheckingAuthUser } = useCheckAuthUser();

  const form = useForm<z.infer<typeof SignupValidation>>({
    resolver: zodResolver(SignupValidation),
    defaultValues: {
      name: '',
      username: "",
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof SignupValidation>) => {
    try {
      const newUser = await createUserAccount(values);

      if (!newUser) {
        toast({
          title: "Sign-up failed. Please try again later",
        });
        return;
      }

      const session = await signInAccount({
        email: values.email,
        password: values.password,
      });

      if (!session) {
        toast({
          title: "Sign-in failed. Please try again later",
        });
        return;
      }

      // Redirect or perform any actions after successful sign-up and sign-in
      navigate('/');
    } catch (error) {
      console.error("Error during sign-up and sign-in:", error);
      toast({
        title: "Sign-up failed. Please try again later",
      });
    }
  };

  return (
    <Form {...form}>
      <div className="sm:w-420 flex-center flex-col">
        <img src="public/assets/images/logoo.jpg" alt="logo" />
        <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">Create a new account</h2>
        <p className="text-light-3 small-medium md:base-regular mt-2">
          To use Socalyse, please enter your details.
        </p>

        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 w-full mt-4">
          {/* Form fields go here */}

          <Button type="submit" className="shad-button_primary">
            {isCreatingUser ? (
              <div className="flex-center gap-2">
                <Loader /> Loading...
              </div>
            ) : (
              "Sign up"
            )}
          </Button>

          <p className="text-small-regular text-light-2 text-center mt-2">
            Already have an account?
            <Link to="/sign-in" className="text-primary-500 text-small-semibold ml-1">
              Log in
            </Link>
          </p>
        </form>
      </div>
    </Form>
  );
};

export default SignupForm;
