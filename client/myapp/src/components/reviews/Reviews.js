import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import ReviewForm from "../reviewForm/ReviewForm";
import './Reviews.css';
const Reviews = () => {
  const revText = useRef();
  let params = useParams();
  const movieId = params.movieId;

  const [reviews, setReviews] = useState([]); // Initialize as an empty array
  const [movie, setMovie] = useState(null);

  const getMovieData = async (movieId) => {
    try {
      const response = await axios.get(`/api/movies/${movieId}`);
      const singleMovie = response.data;
      setMovie(singleMovie);
      setReviews(singleMovie.reviews || []); // Use empty array as fallback if reviews are undefined
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getMovieData(movieId);
  }, [movieId]);

  const addReview = async (e) => {
    e.preventDefault();

    const rev = revText.current;

    try {
      const response = await axios.post("/api/reviews", {
        reviewBody: rev.value,
        imdbId: movieId,
      });

      const updatedReviews = [...reviews, { body: rev.value }];
      rev.value = "";

      setReviews(updatedReviews);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container className="rev">
      <Row>
        <Col>
          <br/>
          <h3 className="h3">Reviews</h3>
          <br/>
        </Col>
      </Row>
      <Row className="mt-2">
        <Col className="rev-poster">
          <img src={movie?.poster} alt="" />
        </Col>
        <Col>
          <>
            <Row>
              <Col>
                <ReviewForm handleSubmit={addReview} revText={revText} labelText="Write a Review?" />
              </Col>
            </Row>
            <Row>
              <Col>
                <hr />
              </Col>
            </Row>
          </>
          {reviews.map((r, index) => (
            <div key={index}>
              <Row>
                <Col>{r.body}</Col>
              </Row>
              <Row>
                <Col>
                  <hr />
                </Col>
              </Row>
            </div>
          ))}
        </Col>
      </Row>
      <Row>
        <Col>
          <hr />
        </Col>
      </Row>
      <br/>
    </Container>
  );
};

export default Reviews;
