import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Footer from "../components/footer/footer";
import Navbar from "../components/navbar/navbar";
import Strelka from "../assets/img/Arrow 1.png";
import IdCard from "../assets/img/Vector (3).png";
import Location from "../assets/img/Vector (4).png";
import ApiCall from "../services/getArticles";
import { getComments, deleteComment, postComment } from "../services/comment";
import { format } from "date-fns";
import axios from "axios";

export default function ArtworkDetails() {
    const [userProfile, setUserProfile] = useState(null);
    const { slug } = useParams();
    const queryClient = useQueryClient();
    const [newComment, setNewComment] = useState("");

    useEffect(() => {
        const fetchProfile = async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                console.log("No token available");
                return;
            }
            try {
                const response = await axios.get('https://api.gaen.uz/api/v1/auth/get_user_info/', {
                    headers: { Authorization:` Bearer ${token} `},
                });
                setUserProfile(response.data);
            } catch (error) {
                alert('Error fetching user information.');
                console.error(error);
            }
        };

        fetchProfile();
    }, []);

    const { data: articleData, isLoading, error } = useQuery({
        queryKey: ["Article", slug],
        queryFn: () => ApiCall.GetArticle(slug),
        refetchOnWindowFocus: false,
    });

    const { data: commentsData, isLoading: commentLoading, error: commentError } = useQuery({
        queryKey: ["comments", slug],
        queryFn: () => getComments(slug),
        initialData: [],
    });

    const postCommentMutation = useMutation({
        mutationFn: (newComment) => postComment(slug, newComment),
        onSuccess: () => {
            queryClient.invalidateQueries(["comments", slug]);
            setNewComment("");
        },
        onError: (err) => {
            alert(err.message);
        },
    });

    const deleteCommentMutation = useMutation({
        mutationFn: (commentSlug) => deleteComment(slug, commentSlug),
        onSuccess: () => {
            queryClient.invalidateQueries(["comments", slug]);
        },
        onError: (err) => {
            alert(err.message);
        },
    });

    const handlePostComment = (e) => {
        e.preventDefault();
        if (newComment.trim() === "") {
            alert("Comment content cannot be empty!");
            return;
        }
        postCommentMutation.mutate({ comment: newComment });
    };
    const handleDeleteComment = (commentSlug) => {
        console.log("Deleting comment with ID:", commentSlug);  // Debugging line
        if (!commentSlug) {
            console.error("No comment ID provided for deletion.");
            return;
        }
        deleteCommentMutation.mutate(commentSlug);
    };

    const base_url = "https://api.gaen.uz/";

    if (isLoading) return <h3 className="text-white text-center">Loading...</h3>;
    if (error) return <h3>{error.message}</h3>;
    if (commentLoading) return <div>Loading...</div>;
    if (commentError) return <div>Error: {commentError.message}</div>;




    return (
            <>
                <div className="pb-20">
                    <div className="main-container">
                        <Navbar />
                        <div className="max-w-3xl mx-auto">
                            <Link to={"/main"}>
                                <div data-aos="fade-down" className="flex mb-2 gap-3 items-center mt-16">
                                    <img src={Strelka} alt="back" />
                                    <h2 className="text-[#D9D9D9] text-2xl font-[600] hover:underline">Back</h2>
                                </div>
                            </Link>
                            <div data-aos="fade-up">
                                {articleData?.art_img && (
                                        <img
                                                className="w-full object-cover h-[380px] rounded-xl mt-5"
                                                src={articleData.art_img}
                                                alt="Main 1"
                                        />
                                )}
                            </div>
                            <div data-aos="fade-down" className="mt-10 md:mt-0">
                                {articleData?.title && (
                                        <h1 className="text-[30px] md:text-[42px] font-[600] text-white">
                                            {articleData.title}
                                        </h1>
                                )}
                                <div className="flex gap-2 items-center text-[#E4E4E4] mt-5">
                                    <img src={IdCard} alt=".." />
                                    <p className="text-[12px] md:text-[16px]">{articleData.email}</p>
                                </div>
                                <div className="flex gap-2 items-center text-[#E4E4E4] mb-3 mt-4">
                                    <img src={Location} alt="location" />
                                    <p className="text-[12px] md:text-[16px]">{articleData.country}</p>
                                </div>
                                <div>
                                    <p className="text-[18px] break-all leading-normal md:text-3xl text-white font-[400] md:leading-[50px]">
                                        {articleData.description}
                                    </p>

                                    <div className="mt-7 md:mt-16">
                                        <div className="max-w-2xl mx-auto px-4">
                                            <div className="flex justify-between items-center mb-6">
                                                <h2 className="text-lg lg:text-2xl font-bold text-gray-300">
                                                    Discussion
                                                </h2>
                                            </div>
                                            <form className="mb-6" onSubmit={handlePostComment}>
                                                <div className="py-2 px-4 mb-4 bg-white rounded-lg border border-gray-200 dark:bg-white">
                                                <textarea
                                                        value={newComment}
                                                        onChange={(e) => setNewComment(e.target.value)}
                                                        rows="6"
                                                        className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-black"
                                                        placeholder="Write a comment..."
                                                        required
                                                ></textarea>
                                                </div>
                                                <button
                                                        key={postComment}
                                                        type="submit"
                                                        className="inline-flex items-center bg-blue-900 py-2.5 px-4 text-xs font-medium text-white rounded-lg"
                                                >
                                                    Post comment
                                                </button>
                                            </form>
                                            <div className="max-h-96 overflow-y-auto px-6 ">
                                                {Array.isArray(commentsData) && commentsData.length > 0 ? (
                                                        commentsData.map((comment , index) => (
                                                                <article
                                                                        key={`${comment.slug}${index}`}
                                                                        className="p-6 mt-3 text-base bg-white rounded-lg dark:bg-gray-900"
                                                                >
                                                                    <footer className="flex justify-between items-center mb-2">
                                                                        <div className="flex items-center">
                                                                            <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold">
                                                                                <img
                                                                                        className="mr-2 w-10 h-10 rounded-full"
                                                                                        src={base_url + comment.user.profile_pic}
                                                                                        alt="User Avatar"
                                                                                />
                                                                                {comment.user.first_name}
                                                                            </p>
                                                                            <p className="text-xs text-gray-600 dark:text-gray-400">
                                                                                <time pubdate="true" dateTime={comment.created_at}>
                                                                                    {format(new Date(comment.created_at), "MM/dd/yyyy")}
                                                                                </time>
                                                                            </p>
                                                                        </div>
                                                                        {userProfile && comment.user.email === userProfile.user.email && (
                                                                                <button
                                                                                        onClick={() => handleDeleteComment(comment.slug)}
                                                                                        className="text-sm text-red-600"
                                                                                >
                                                                                    Delete
                                                                                </button>
                                                                        )}
                                                                    </footer>
                                                                    <p className="text-gray-500 dark:text-gray-400">
                                                                        {comment.text}
                                                                    </p>
                                                                </article>
                                                        ))
                                                ) : (
                                                        <p className="text-gray-500 dark:text-gray-400">No comments yet.</p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </>
    );
}