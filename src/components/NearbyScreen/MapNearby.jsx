import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  Button,
  ImageBackground,
  TouchableOpacity,
  Image,
  Pressable,
  Animated,
  Platform,
  TextInput,
} from "react-native";
import { Marker } from "react-native-maps";
import MapView, { PROVIDER_GOOGLE, Callout } from "react-native-maps";
import { mapStyle } from "../../utils/mapStyle";
import { OpenMapDirections } from "react-native-navigation-directions";
import { decode } from "@mapbox/polyline";
import SpotInfo from "./SpotInfo";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Fontisto from "react-native-vector-icons/Fontisto";
import StarRating from "../../utils/StarRating";

// const { width, height } = Dimensions.get("window");
const width = 250;
const CARD_HEIGHT = 150;
const CARD_WIDTH = width * 0.8;
const SPACING_FOR_CARD_INSET = width * 0.1 - 10;

const MapNearby = ({ spots, location }) => {
  let mapAnimation = new Animated.Value(0);
  let mapIndex = 0;
  const _map = useRef(null);
  const _scrollView = useRef(null);

  const markers = spots.map((spot, index) => ({
    coordinate: {
      latitude: spot.location.lat,
      longitude: spot.location.lng,
    },
    title: spot.spot_name,
    image: spot.selectedFile,
    rating: spot.rating,
    country: spot.country,
  }));

  useEffect(() => {
    mapAnimation.addListener(({ value }) => {
      let index = Math.floor(value / CARD_WIDTH + 0.3); // animate 30% away from landing on the next item
      if (index >= markers.length) {
        index = markers.length - 1;
      }
      if (index <= 0) {
        index = 0;
      }

      clearTimeout(regionTimeout);

      const regionTimeout = setTimeout(() => {
        if (mapIndex !== index) {
          mapIndex = index;
          const { coordinate } = markers[index];
          _map.current.animateToRegion(
            {
              ...coordinate,
              // latitudeDelta: 0.0043,
              // longitudeDelta: 0.0034,
              latitudeDelta: 1,
              longitudeDelta: 1,
            },
            350
          );
        }
      }, 10);
    });
  });

  const interpolations = markers.map((marker, index) => {
    const inputRange = [
      (index - 1) * CARD_WIDTH,
      index * CARD_WIDTH,
      (index + 1) * CARD_WIDTH,
    ];

    const scale = mapAnimation.interpolate({
      inputRange,
      outputRange: [1, 1.5, 1],
      extrapolate: "clamp",
    });

    return { scale };
  });

  const onMarkerPress = (mapEventData) => {
    const markerID = mapEventData._targetInst.return.key;

    let x = markerID * CARD_WIDTH + markerID * 20;
    if (Platform.OS === "ios") {
      x = x - SPACING_FOR_CARD_INSET;
    }

    _scrollView.current.scrollTo({ x: x, y: 0, animated: true });
  };

  const getDirections = (marker) => {
    const startPoint = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    };

    const endPoint = {
      latitude: marker.coordinate.latitude,
      longitude: marker.coordinate.longitude,
    };

    const transportPlan = "d";

    OpenMapDirections(startPoint, endPoint, transportPlan).then((res) => {
      console.log(res, "RESPONSE DEL GET DIRECTIONS");
    });
    // return <GetDirections spots={spots} location={location} />;
  };

  const Loader = () => {
    return (
      <View>
        <Text>Loading</Text>
      </View>
    );
  };

  const src =
    "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBYWFRgWFRYZGRgaHBoeHBocGh4hHx8cHh4aIRoeHx4eIy4nHB4rIRoaJjgmKy8xNTU1HCQ7QDs0Py40NTEBDAwMEA8QHxISHzQrISs1NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NP/AABEIAKgBLAMBIgACEQEDEQH/xAAbAAABBQEBAAAAAAAAAAAAAAAEAAEDBQYCB//EAD4QAAIBAgQCBwYFAwQCAgMAAAECEQAhAwQSMUFRBRMiYXGBkQYUMqHR8EJSscHhBxViI3KCkqLxQ9IkJbL/xAAYAQADAQEAAAAAAAAAAAAAAAAAAQIDBP/EACQRAAICAgMBAQACAwEAAAAAAAABAhIRUQMhMUETImEEgaEy/9oADAMBAAIRAxEAPwDSe9U/vVA9YvKn1ryrtqjksw73qnGaoDrFpy45UVQWD/eqXvVAahTyOVKqC7DxmaXvNAD7vXV+Xzoqgsw73ml7xQMnl86e/L5/xSqh2Yd7xS94oCTy+f8AFOGPI+v8UYQWYf7xS94oHX/ifvyptXcfX+KKoLFh7xS94qvD9x9f4p9XcfvyoqgsH+8UuvoDX4/flS1+P35UVQWD+vpdfQOsd/35UtfcfX+KKoLB/X0uvoAP3H1/in19x9f4oqgsHdfS6+gQ/d8/4pF+75/xRVBYO6+l19A6+75/xS193/l/FFQsHddS66gdfcfX+KbX3H1oqFg/r6XX0Dr7j60usPI+tFQsG9dS6+ges7jS19xoqFg3r6XXUFr7jS6z/E+ooqFg3rqbrqCOJ/ifUUus/wAT6iioWDeupddQfW/4n1FN1v8AifUUVCxBK0gy99RDE7/kPpXSMxMCSeELJjwqzMkOnvpSO+usDLOx0qGJ5dWfna1F/wBrxx+D/wAbed7VLkl9KUW/gGSORpdnkfvyq3boHEEdpL7jlQ+P0ZiIYMEHYgE0rRf0KSXwB1L3/flTa17/AL8qJOQxOR5fCd/SulyGL+U/9DTsgqwU4i8j9+VOHHf9+VWS9D41iQAD4fpNQt0djfk89BpWWwrLQH1gpaxzo3+240To2/x/aoxkMU7J8qdkFZA2sfYpta0eOicex0C/hRCdBYmkk6Qw4c/PhSsthSWio1rThl+xRr9G4gXUUgeA+4rs9DY2kvpAETeJjwotHYVlor+zzroAfYqZMo52AP8Ax/iix0Pj/k//AJH607LYKEtAHVj7FN1Y7qNHR2N+T5D6VIejMeYCDaeFKy2Or0V/V+FN1NGDo7H/ACb9wqXE6KxwNUL4SKLLYVeiuGBS6j7mjsPo7HYgaYnuoh+h8ZfyHw/m1FlsFF6KsZf7ml7t3j1qyHRmNbsD5VMOiMUi2meVK62Oj0U/u/f86Xu/+Xzq1bovF5KfMfWpMPobEabqIG0zflY0XWwo9FOMv/lTdSPzVdp0K9pZR6/SlnOi2RZVtcbiI9OdK62Oj0Ugw15n786fqhzP350xzyAwTBFiCYI8jtXYzSkTP35VfZHRwcLxpur8alGaT7/9UveU+zR2HRHoHM/OloHM/OunzaDefUfWmXNoeJ+X7Udh0cFfH508ePzpzm8Pn+1L33D5/OjsOjK4eJnEsrtB7x+sA+tS+/5obs8/7iP/AHWhGGKfqxyoeNE0eyl/vGMwhy6wANSmD6g28aNy3S+Kp1wXMC7GT9fMUacuOQphgKOAFS4x0UlJfQzA9oSD2gBME2YePPnU2B0srurK7rpBBTTIMniQP050D1I4ftTHAHOoojS0i/w+mNXZ1rqW5EQT4ho+VVPSHTGZVuy2Go5FpkeRBW0Gb1BoaI1W5T9Zpmwzzn0/ahQwxuTaLnI9LOyr1iCLfA4bzMxHK1EHpDSwCYZuO0xInulWYE1n1SNvTcV0uIw2YjwFvkaVBqZp8vmlazFgYuCNP6ftRSZiR2eHcdvOsvhZxlgkkxyG/wA6ZulVB+LwlT+s2qKMq6LnO9IjtDUojYlgIPKs9mPaPS+h3EjY7D/ttU7dLoQO1HMQWmmfpTDiNS7ETocW5SJirisfCJST8Y+B7QhVDm4JFgjE3m8gW86tcXpmyENhkMBYsL/SqBM3hIZRyL7aD/8AW9TYuawXHbY+IRwf/ERPlxpuPfgKXXpdYPT+XVmQuqODdTaoc9024RnRdSC0Kb+VVTZzAFtbW2lHPzKUnzuGRAxCB4OLeSipUe/Buf8AYZlfalMQBVYo1hLiL+XCrLFc6SwxUIiCSYA32i4vWfOdwohXE89LfutcdYjA6sRTb8rD9oPpTcdIFLbLno7Po8A46M4P4XW8eV6NwM3OtXgbwSbGP8hYHzm9ZTThcNPiEN6jlRIDATxg/vtQ45BTSNM/TqKRsVkg6W1RymJInvp16fwlJ1P2bwN/LmD41lMPs3Drad+/yonL5oAy2k+A+opuAlyGsOcTFUHDdWFjw28Dsa5xelcPCJRmE23N/veqN88G5/8AWl1ikksGM/41Khsu6LHN9Oo2GzKbiNiJ8h+LyoJenXsURiDvqAXwvBJ9KizLo40gRccCNqWHoXcx5t+gqlHrwly79LRekGKHrFvEBlPDhvFZnNdKvrkB944C3rV1iZlCIknxk/qarcRF1EzxmnBY9QpyT8YBm8z1vxowYCJ7NwNpvQ6Zc93p9DVppXnTELWqZi+2VxwOOkT4n97V1oI/DPn9frR5I7vWlPd6UZFgBGEPykeB/aYNOMtx/cj9KN/4+tLWB+GjIYBUwCN58zPzN67938PSpuuH5fWn6/uFGR4JVWuxh0Hm844EoB6UNlelMQmCB6VnYbkk8Ftop2waAbPvJAj0pf3F4GwPhRYdkGjArtMGq5s5ibT8h9KjbOYn5reA+lGRWRcHB76dcKqvL5xzZmPiKZMV9UFjz3NxypWHZFqcDvpLl6Hw8NmYXPrU2YyMNalYvAZh5WRFc5nohWgwLigOl+mhl0VUMuRAA7iJJsQPOsdmelMR21FmH/Lx9alORlyc8I9PtmwfodB+ID/kP3NcnogDcken1rDnEJPab51w2YK/A7r4MR+laKTOd/5ENf8ATef20cGPlFdDoxeLNWGwenswv/yM3+6G/UTRK+1eYFiEPip/ZqeWWuaDNgej1G5P/YfSn9zT8o8yKy6e2Dfiwl74c/uDR+D7UI26svf2SPWZ+VHZanFl37on5V9af3Rfyiq9ensKwLlf9wIHqARRaZ5CLOreBp9lpxJDlV5D9a692Xu/6rUZzSbyvqPrXa4w/D8iP2NLsOhwgHEDyFP1f+Q+/CmGJP2a619x+/OgZycD/L5/xXHUjn8xU48/nS1d/wA6Mh0QDK0jlxzWpjHMfKuUZW+E7Ei3MGCPGRRliwRe7j8wpDL949KJKd59aXV9/wAhRYeAcYA7qRwByojSOMVyUXw8DRkMA/u47q5OX8KLKiN/nTDDHP5CnYKgvu/d86RwPH786L6sfYpaKLBUC937z86f3b7n+KM6sfYpuqHIUWCoDloNj4VW5jB0udO00Th5hZJG9SYdySfH61mJpSQFiNJ2uLGpurlZ3iK7xEvtapcJ1AM0CURnwrBu4V2+TNoHCfKmTPJAAIgftUeZ9okQntCwjv8ASp7KxH6DohDERU6/EKrR07hyWvPgfpUOZ6aVZ0dpuHIefHypmWYo1D5tEAdiFA52ql6Z9rdupvbczArKY+M7tqdiT8vSnCVAS5ZNYj0cZrOO7F3Mk1BrorqxTdUKpSOV8OXlg2o0+o0T1Ipxg1SY1wIEdeVKJ33oz3eadcrTwWuJIA6unUGrZMh31L/bBzingtcZV4bnapV1C42++VWa9Ej81E4fRsfiFMpQZVJmXHE+f1+oqZcUne33zFW69HKd4nmLGu16LX7/AIinkdGVYxHGxb1+/nU6dIONyf09I+lWaZACplygoyVUBwukHMQ7Dzn6/tRaZ9+ZPp9KlGRX8oqRckvL50ZKSZwvSL8p8r02Fm4mFgklj3sdzBogZOuxlaWUPDORmjz9RSGO35gfOpBlO75U4yvdSygwyB5YqTPYOoXO8EXg3EMbGalGO33Irr3XurtMseH60ZQ8Mi65u/1FdDMNxDUQuSb7YfWpV6Oc8Pmv1pWRVWCDHPf6fxXQxfGjV6JciY9SP2mpU6GfiVHqf2FK8RqMit6z7mm66rdehTxceS/zXf8AZR+cju0ik5RGoyPKOicV1MEEr3nbwq/w86fyN8q3KezWXGwPrUidA4G+g/8AY/WoUkiY8LRgMTNMWEK1U2fOMztAYLtAr1teiMAXOGD5k/vUwyCTqXDQHh2beY2NDlkb4c/TxXBymKPhV77xN6cdHYn5G9K9hxujWZtRXD0ieyV39I/WuLJJTBRiDEoomIvtJpZJ/FHkX9rxfyN6V2vRmL+Q16dhYzkENhBEVpA0G/G4i52Ex51Nh5tGv1aLG8pePDhbjNMS4Vs8vXorF/IakHROLxQ/KvWGxAqyFS54AWH07yRUhZz8EDvAETyI4ePjSyV+C2eSjobFOyfpUidB4x2Q160FcR2gecKfr+9c6mJs0f8AHfaTMzFGR/gtnlS9AY/5G/6n6UQns1jn8Df9W+leksWP4m5W87jeKk92YrGs2EXgz4xF6dh/ijzlfZPH/Kwn/E/Spk9ksbkfT61vcHKFZIJk8JJXyB2qTQQd5Pdv9PlRdj/GJhE9ksTv9F/ep09k3HP1UfvW4RTufnXQQbETR+jH+UTHJ7Mv3/8AZfrRiezLRJYDuk/sIrSDBFxAPnHhSVBczMx4UXY/ziZ4dAONoPn9RSTodpiUnlqv6VoNF97fP+BTuqi7RHMD9xei7CkSjHQ54lfn9K6/tG3bX51eKQNr+nrTEg8gKVmFIlQOhv8APz0mkOih+f8A8aslxUYgC8z4efCpigtMee9FmOkSpfom0h7ffKlh9FoT8ZnlH/qrMYilo3I79qizGawsNGd20KJkkHz2maV2FUQDo5OKg+v7k1IuTwxcIPMDahMn09gYyB8E60adLwwUwSBuJ3kbcKsmIABYwOX2b0ZY8IqMp0vgvmcTKqjDEw0DsSq6NJIAAYHeTxA41bPgDivnXnuPm/d+lMxmRDgLhpiYYu64ZAPWqDvDACB38SK3eW6Rw8VBiIwZSJB573HpUxllFOOCbTvCn0EfrXQBA7P7fWucvmUZbEnaRP2KgzGagkK0ED8UQe6Y3p9iC1U8f0/mmYGd/K/yOwoHI5pn1anE8AIJ8bCwqXGxSGADLpiTIJIjvDftRgAqfGf09aRxaDzWK7DssAQRcA7HxMGhMXHebAkc5/igA1ukU2uCdpgfOafL451MGeV2EqZn/dxFVDvisLohG8E3Hy3AqHK4eZSe3A4CAbd99/CrqsE2NRjOAIPqKFTNkMFuQ2xERblegNbmNTSRv2d/nQa9Gpr163B3sYE+FJJfQbNKRu1tvkJ+tVeLmdEvCuJuLhhJt48qmTNECJn0mhggkkgepoX9jZw3TaG+nau8LpVDzvYHePEDbhUeJlEYXRJmZsD+lcDKKN1Xx0ifWar+JGWWD5pfhBEkAkxYfU/Sos30gdP+kpJEgjQT5g7GoBl15Af8f5rtsMd/7fvU4KyFJnZQMymeIIj5H7vUiZoFSTaJt9ONAi3H5n+KUDmKWAyFYuaIE6pB7hPhwNMmZMyzSDFgp899qGHn5AfvS0DjPmRTwGQlcwwK9q0HgL8uIPypsTNXsQb7zwqFcIEfzTLh/c0sBkK94bVuum+xuNoHfTDG3BM3kXiPlt40OpQkqGUsNwLkeMbV2MJedAyXNZ0omoITFyAR8uZqk6A9rVzpxUw0fD6oqra9Oo6p4K1vhPGrZsMX7wa889g8PT0h0gn+1o/5Nfb/AC+dRnEsF4/jk3mKmKGDJieTA/rf9KPGZPHbn38dhQjYYHGPWo3xADaSeSmfU8PM1oZobN9KJglTi4qorkKoa0sdgJoxnae7beB9xWE/qjgv7kMQx2HUjjDapA+dapBrVW1gggMNgpm4sAJ85qIvLZbjhInyyBWJRRJ4jVHfcmPSsz/T7pHFds6uI7uUzBIZ2LaQw+FQT2QI22rSop1rcm/+XCOYisd7HNoznSKiw61DuNiH8yKTbshpdM2pMsWvO3d6LFRdKYa4uBiIQRqRgTfkb34iuIbi1p7u7upZnA1o6nZkYbwYIPEbUSXTFF9oz/8ATXNt7iiSSEfFUWtAdjvx+LetPrkyzE34bbcKyX9MlIybAfhxsVdxFmB599axMIyCSDcfYv8AWmvAfpkujVB6YzpaLYWGBbcGj2y3ujtiIpbBYy6CZTftqOPeOI7xet6Cwg3S/SDT8C4SebCT4/DWybKTIMEEXFjI76lLKz9G3h4+DZbMq6q6PqVhIYNIIPHeKkfeT62/aqDGyrZbU+GC2GTL4Y3Em7Jex7tj43q4wArqroZU7EE/W3huKtPImsEioJJAE84E3qn6N6c63M4+BpKrhaIeRLEyGGnjBHDhHMVbnK2ILMAR+a/lG1YHKdH6+k8y2jELoU6plsFMIHYuRCwukRuQ1hUSk1JJFwinFtm+bFE/HH70yMI3oX3Vh+JiRv8AKbV0obg0jnNPJAUW7/1p9fcflXKoBB1D0NOxHFgPL6mqvHYqy0dGfs04eN/1H1rhSo/GTTl14v6tSvHYUlobWeQ/7H6UlfnH60hi4cEzt/789+FNjY6XlwI4yBHK80XjtBSWiRiO4eArlXA4/pXHWIPxzHIyfTjXOYzmAil8R1RRuzEADxPCi8dhSWiVsUfYpahz+VDZbPYGImvBxldZIlWEW3gwaLGMgHxCe8nu5DvHqKLx2FJaODijn8v5rpSDzpe8J+ZfIn6UzZrBAJZ0tcknYCZM8rH0NF47CktHWtRxHyrrXy2rzb+qWKhbKOpBUYm4uIBE1vH6Vy6ydQJHBQSfCFm9JckX6U4S+BfWff2K6ZxxgDiTEUCc+kBmbQL/AIGJ2k7HlxpvesIlQ2JrJPZDLG8CwETvHHehzjj1AoSz4efexuL/APucyLKDh4kC2wdInaTufOvSzml4OvlFeZ9CYaYfT2OH+HQ+mRNyEP6TXp3v2GImYO0KfkIqYyikk2OUW28IgbFZpAJW+9pPgL28Rw86wnQ2GU6azCuI14JYQSs9pL78g3pXoHv+ExCrMmd1Prt3gz3isfm84E6YwS47L4WMkqe8uD4Qo9e6k5Rck8lRi1FrBqHCbwp5k3HqT3VIHA2PoP3FuVRv0lhgzpY8pIPAR8TWNxUidKppnSwI3WATvGwJnyNV+kdk/nLRRe3y6+jcxInSJHC4gz4ii/ZJCcnlmMktg4d7/lEeVde0TddlMdCp0lLSI4HhMgggbgVV+wfSM5DLkq/YUqSI0yrlefCBwqFOKbZTjJpI1V7Re/PvrI9AYBXpPPoIBIw2Ajhe8eL1qT0keKEcdxMWvE33mB+tqyuM+nphmUSXy/OJuv027qUpxymmOMJYaNYcAk/Dw4Ry+W5pNlyBccDxuN/SgsTM6AGbs3iNZAv4mZngN6c50sVEHncsCRpMlQ9z4cpim+aLWBLil6UnsCjKmaQAdnM4kTyK4Z/ea0hJ1AErM9wHlzNY72Txh1mcUNpUY0wTAJKASYBgkju/QVqExCGQHZmsoN7WM2uNj53iKS5UkkN8TbyZ/wBmMMnP9JuSo/1MJb9ytWt6q99PDZfHlWR9nwVzXSDndsdAvxTZDyU8xerDMdMoj4iO0aQChZCZBiYgXgkTO03il+6j0D4nJ5NA2H2SAJBm19j4xVHjq+A+vDujGWw5jkCRfcc+6DPATFxmYAriPrUnslUCzN7ATsImY4xUGLnMR31KbC0ARCxxM3Pf38OOcv8AJWilw4+mly+fR11oTHfYgwLEAkg1legcv1OK+K+KS+KiGWJ3JOoTHDQu441IZVi6RfgBNpPZ5QCT4Uz5V3YvcdnTBiIvaD8PcfGs5c7bTS8NIwwmtnD+1eIuZZXDdXp7BCgsGgXJ/Eszt3eZH99m+rTzHfVbj5IqGXcngdJF+MiwO9AHKvyB76zfPPZS4omrbDe8ulg2mWNmvY7yLG+4g2MUy5djBOJqjgs73E3a23DiDUzY66wvWGWBAHYkQJ/Csi3dwqI5pAO3jOs/i1wD/tiJ9Ab99XgrI75J2ntiYvZgI9d97xy2pxlNlDuwG8LJMCCCRMGCNjaLQaHzGNgoWhzKGSOsFyfzB21EcOyJ5cqr+n/aJMomGWQlcSWUI2sAkSbSgZTJtI53oUcsTeEXX9v1CzOdoPYsZ7wbjftTea4zORTSuvEZCNVyyLaDLXAFrRAtpHI0F0aExUGMxeHUFQwjsMJgKkiRIgmTf4uFTYOTCqx1qrREqh1wSCBcEsoa8aYJJM8aeAyNh5RCqhWxGEAgh3PMzMBZJJIiQ3CZqPpjJjHyeKiECQp1T2SJ31CxsL+HhU2pFbQMMswBI16dOpbnSpYDUIMwARa16j6Tw3fCzK6z2kIDEKFgjYLOoiDEniD3UIT7RmP6b5n/APHZLlhiNEPCnsyNQ/LOqTbhPCtLmMsssWbQbkkggLJBJUaWVpP4pPdEmMJ/T3IoxxsV0Z2wWAUK+kjVqBiSOXMWmvRTokM5WdWmS1w1oAAJEgxdY32NVPqTFHxESklZY4j9Wd1MByT3MSRBmCNjI4RGmVURrdpYyqakX4YZoEhmgG/HaeFSYrMykdhW2X47N2wSCd7RBEfEd4gyde4VQoDOo+IgzuRB0sDeF2Mb7wKjJRkf6m4YGDlXExqETvEE8b+R2rZvBVlXCUTABJF9J3+E7R5dxrL/ANUl1ZXLljDCWa1tRG1pg3PGtB0Vj4j4OC5HxIpJgIQSNiCApUa522X8Wqrl4iI+sIx8ZVEIqtEWDASIspPkNzsw3vT4MnSCovLaRrMEHeSYaIXv2tTHKsJJ1MQZktAsSQsW7PCDY38+WTXqMMTYNoxH0AkExAKiYYWtFu+oLMR0iNPTq2MMSLCdUo025bA+fjW6TBMsSkrbTGGAd7ghrEWB33rDe3+GR0llW31Otrxd0ER4Hcb1uMLolU3TDkGZ073BsWMjbaa05PhEPpO2JpGzEAAAf6cyDzZpNo+XfWK6exynS+Wee4d2pXHI37XI1sxg4aqp/wBMBie3oUCZG07tq0ne9Yr20K+85LHR5UMillts8EjaLKamPo34bVs0ROp0tcr10HYTYJfdrH/Hy4XGbSXQqNpgtJibna1o1HlFThBACdnTxRTFgbksIA33O5ofDzCs5YO76T+EBiZ4EKsr8uFSMlwsTWuIjKwJw2JhWC3giCfxX2rM+xWWLZDsQTh4uL8Qgjtc9xzrV4PxDQjQZ1yRIlTAC6rGY4fO4o/YBgBm8MbLjsR4ML/Oapd9Ey67RmMT2yxlxUwNCIjMATBBHCeOxvcGtH0owHSeXL2BwXE6oDW2JHA3tXnntPg6cy0CCH/cEV6B03iRmcljaio0FZH+QjdvpQ8JCi22XWV0Jr0hUVG7RIElibszKANMEcJ4mpsnJZVJGkMJ7bEmNxEAECR6VR5n2mVj8F0uARpJgkReLQCduO1qr8Lp8A6ZZXYFWUwAFA1LpJJsNrjasXypMvAX0K6jPZwKJGtCCDEtDDib3kSOVHdJ9JjDJxEALIAGAkhbj4QYJgheEECqTI4oR8Qw669OrVswWdrS3Ek9wo/ByIgSjhTubiQbmDeKTm5LoaRUo5ZsWGZ1fEDTtAEzvcC/rVrh9FvjYmsmwA+I3AIHZ84Ene3fV7hZnBVWVBpUAcDJA3mYkedThi6DqlWQBcnSNuUE0KPfoZA8To5cMBgSRN52HLkYmhMPEw17ATtb8dp3E2M7RVm2WJHbeeJgSO8QR+1cZnLxpCdqePADkN7+EbUOOgTAcfGfZUkc5ERNwRMUKhd2gsqsDdbTJ5HlVkcQZZAzkMTu0fDfuF44D50IM0jsNSsdUCYCjjcWkye+k0vrKTAXVlDlwVtfS6kzfcA8f2rvKYGtQ0G/Mp9KMx8BdQJdCCBAA7Q37RPOq/FGXBs798GATxO1R4NMtDky2pGK2iMNbKixpXTIAFuBmNRvtBC5EBtaqmoAAOpllmeyJWVWTwjfxrN5T2swcXV2kwiRZCCMRiBbW7FVPGwJ2F6ukZGYp1hchbr1ik7fDC/EWEC/ma6n0Quyc4oWQzBGJ1QhXUREXlezJ03JB5EV53/VDMMRl0dQHUEmLqYtKniPG9ehe8qik4WGxIk6V0qGj4grmAzW4E33O9YT+oOUfFTBxGK4YOslXcDTLsRYXO42FPj6miZ9xeDQYWK+F0ZgY+MxbDVMNgqgaioUBVYsSJ710mONdezHS6Zv/UVerZWK6CwMqd206gVJJjVB2FztXWeXrOiUw1cOoRUDyABAAuZ7MRx4ETF6q/6f4TZfAxFxh1Z1mHK6pUqurSyyGHZN5gb3qmo4bEnLODXK2GhRILMC5gMLGZLEuwLGQRI3kyONc42WMY6zqlCFADArOkQ3bIY3F9KwF4yTXeGkli2IV3UdlbmwspXbVIg/zTZfMaQ8dYW0kyyhV3VgYG38esItmN/pthacfP4YAfSVMahFmeb8d49a3rF5GlAoHE6jO15BHDmD8Neaf09wFfOY6sGPZBOlmHaDrOrSQWHjPE7mvQs+uoK3VF4MHtAAACDcTJmbRuDyquT0iHh1ggKxdi7Md2BnTxAEWRbbED5V3mHVSWAB3MgSEkD4i7diTFwLgeEQ4OUB06sFEN5uWAB1T2SBJhiL8DvaDKmWRWcDSX3NlBgwBK8uIiONQWUftpgdZgYDrDKuPht2YI0yCTa0RNYP+omLOeHAArMW2IFbX2zxHGVUPYjFUnQCFiQV+IksP/UVl/6gZ8pmSuJhYTixVina2U7gg799a8b7Ikuj0nCdNCmXfQPwkzI5hYlovtPjUjoSjFUOu4AbXwm92/xJ9OYqvxOkEbDTU74Z2JRhJt8IkMOPDfnUOD1TSrYuMdjqZySVgGOyNN4YEC/aMRArHKLwZn+qKsDlMUhSqkCBvKwWmbRaPu21fFWcPSmGvWHsXEEQCL6SJAAMT+GwMVm/bjL4WJgYeGGCNhk6VcvLCDpuQST47ULmUYwxbDVIUMiapIChgpaDDDTOoARJBBqpTWEkTGLTZrVzyq7qzqjBdTdoBSIHaLBbQQRcrwtesV7X5lMwiaDpdMQEoRcDgQFmQZERwO1Q4Wr3jrcDEQK5jqgjMQGIUKRpveZMcRNFYuUD4hl1XEP/AMegk6lvqXYIukjw4RNZuTXg8ZNEM8gVEL9Zq0CSwdBf4dEiTEjblvtRmHnkGlkchFGlViE7gAoANhtvyrK5HEYYZfrT2XBSFW0qeNjsDx5UVl82FJUguqIFSbG1iOzPE+PfUfoy0s+l7kczpQ4jOFWTCayyaZ3A0rBnhf8AaovZPKDBzGYEz1sODIuBbbfjy5VQJn8RiFRAmjQToFokGCSQbxFoNWPs3mWfHCvvDTDHed+4HlNVGfaJlHoz3t/0O/vJdEZlYD4RNx4VoctOJg4KsrKyrAEW4G4PD6VT/wBSMPQ+HiKz3BB0kjY8xUvQHSDPl1UO4IBAMmfM8arlf8SI+kr9HEF9SHVpMWJJ5xy+nKhhkJK4jLpcgz3MvwsY5i228Va5HPY+z4hJvttbx50xDGWFyYPiOU8DXKsfDULyGVGnXrIaNgFEiACSbn05mrDBzCYchxe2lmYtI8Tx7qoMLUqgho1SQCdh4+lTa9XxSYixvHhNXGWF0DXZoWZAdTIIaIJHHxG48qjzuO6JrRGmRAWDE7n04c6qMfMFtKn4BBmbiOXdUGfyLPiDGwyoGpVdWd/hO8QDBtWilkSiW2ZzTEdhRJNwT3bmT9xVYmbx8Jl7Sujkagv4NW5njJiqrpXpPDwsR1w1GpUgFgwOo3NuIg1P0JgscIM6jVuY+7VDbHgvzmVxGC9aoi8BSbjjfyqDGKM8EmADeIHfVcqHWSGPIc6Jwl7cspKwAL2pJt/BVI8fCRWOlW2kSeXEUKc1zif9tGuRqEmBeOQP7Vx7uDwNrG3EVDTTKRFmPZlSNOE6KIMasNGEybXQsQJXc878Kz2Z6H6TwGZsuwZSLjDRVETHwMoAP+2edKlXbCTRnIEyXtbnMtiBcyjOogaHTQwH+MAA+YNA+1PTKZjCw0w1ZSp2aNr2kb3586VKtlFdS+mbf8cHpPRhTE6IVVi2EFaODhFJnv51lP6T4jAZlRFjhmSGMGXAiCBcjaRt3UqVJ+S/0C9R6ImM7AaWTVvxgA7WJnZdpAvvXRaVgOrSr73NpvEjszHf38aVKsEaM869lM0i9IYqPh4akjEXsrcmQQW1NEWaT3DnW8YppXViGJAuVF+0NgvaU+Yp6VXMUTjGz+GCQXcwRJBsNRBjsrPK0RBpYbhtQkiL6tTQRA27e+/HhxpqVZNlmd9tsQe6vpDdllJ1fi7AJIuSBfjBkHhFZz+rizi4DxZk+cLT0q34fhlPwNTHfGRGdLqigMeIsTK7MTAvNRZnO4+KmWlioS9wGbXNjEWVZkClSrks0zT4dLmMTHgYrklNIDXOoWV25AyswRaasGWFCOi4mkCSVUHSBGowQAYI2mAON6elUuTyI46PyKlQuG5FwSCQZXsyAe8C8i9r0Tj5H4HLEN1haCTu4gM53Jmb2Ekb2pUqE3koHxcAkaSgIVm1GNtIEAfMzUqYcOpXTAgABhMG8/LcUqVZy9GSYuMrbr2kkCGiDwJi4nfyFTezeY/1ELIofEZwG1kkoIM6SN5gEg0qVbcRLBv6mL/poL3afSqz2SAfAIkiGIJnYHb50qVa8v8A4ZEfUaDFw0CKNRLgX9ZobL4RYMV1BksVmzcZNpmnpVyR9NvhDk8QqXRgSoaQCBYN38u6rfN4IIAQxYyASSCI+E8qVKtEIEDggkmIEaiAU2sDGxNSZdkxcIdogEwRq2g8Y2MilSpoS9COnMsGPVgB0IRtTXfVtYxsANqgxMbSFwxIbfWdhGwalSpMpHWGqaEIftGSdI48r8KKyuA4wyQmrVuC0QeFopUquImFLgq6idCkg9hTLfOqjHwWRiALb7HjSpUMEf/Z";

  return location ? (
    <View style={styles.container}>
      <MapView
        ref={_map}
        provider={PROVIDER_GOOGLE}
        style={styles.fullMap}
        initialRegion={{
          latitude: location.coords.latitude || "",
          longitude: location.coords.longitude || "",
          latitudeDelta: 10,
          longitudeDelta: 10,
        }}
        customMapStyle={mapStyle}
      >
        {markers.map((marker, index) => {
          const scaleStyle = {
            transform: [
              {
                scale: interpolations[index].scale,
              },
            ],
          };
          return (
            <MapView.Marker
              key={index}
              coordinate={marker.coordinate}
              // title={spot.spot_name}
              // pinColor={"#84E0DA"}
              onPress={(e) => onMarkerPress(e)}
              // onPress={() => prueba(spot)}
              // onPress={showModal}
              //   description={marker.description}
            >
              <Animated.View style={[styles.markerWrap]}>
                <Animated.Image
                  source={require("../../../assets/marker.png")}
                  style={[styles.marker, scaleStyle]}
                  resizeMode="cover"
                />
              </Animated.View>
            </MapView.Marker>
          );
        })}
      </MapView>
      <View style={styles.searchBox}>
        <TextInput
          placeholder="Search"
          placholderTextColor="#000"
          autoCapitalize="none"
          style={{ flex: 1, padding: 0 }}
        />
        <Ionicons name="ios-search" size={20} />
      </View>
      <Animated.ScrollView
        ref={_scrollView}
        horizontal
        scrollEventThrottle={1}
        showsHorizontalScrollIndicator={false}
        style={styles.scrollView}
        pagingEnabled
        snapToInterval={CARD_WIDTH + 20}
        snapToAlignment="center"
        contentInset={{
          top: 0,
          left: SPACING_FOR_CARD_INSET,
          bottom: 0,
          right: SPACING_FOR_CARD_INSET,
        }}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: mapAnimation } } }],
          {
            useNativeDriver: true,
          }
        )}
      >
        {markers.map((marker, index) => (
          <View style={styles.card} key={index}>
            <Image
              source={{ uri: marker.image || src }}
              style={styles.cardImage}
              resizeMode="cover"
            />
            <View style={styles.textContent}>
              <Text numberOfLines={1} style={styles.cardtitle}>
                {marker.title}
                {"  "}({marker.country})
              </Text>
              <StarRating ratings={marker.rating} />
              <View styles={styles.button}>
                <TouchableOpacity
                  onPress={() => getDirections(marker)}
                  style={[
                    styles.signIn,
                    {
                      borderColor: "#FF6347",
                      borderWidth: 1,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.textSign,
                      {
                        color: "#FF6347",
                      },
                    ]}
                  >
                    Get directions
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </Animated.ScrollView>
    </View>
  ) : (
    <Loader />
  );
};

export default MapNearby;

const styles = StyleSheet.create({
  searchBox: {
    position: "absolute",
    // marginTop: -1000,
    marginTop: Platform.OS === "ios" ? 10 : 20,
    flexDirection: "row",
    backgroundColor: "#fff",
    width: "90%",
    alignSelf: "center",
    borderRadius: 5,
    padding: 10,
    shadowColor: "#ccc",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
  },
  chipsScrollView: {
    position: "absolute",
    top: Platform.OS === "ios" ? 90 : 80,
    paddingHorizontal: 10,
  },
  chipsIcon: {
    marginRight: 5,
  },
  chipsItem: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 8,
    paddingHorizontal: 20,
    marginHorizontal: 10,
    height: 35,
    shadowColor: "#ccc",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
  },
  scrollView: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 10,
  },
  endPadding: {
    paddingRight: width - CARD_WIDTH,
  },
  card: {
    // padding: 10,
    elevation: 2,
    backgroundColor: "#FFF",
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowOffset: { x: 2, y: -2 },
    // height: 150,
    // width: 150,
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
    overflow: "hidden",
    marginBottom: 170,
  },
  cardImage: {
    flex: 3,
    width: "100%",
    height: "100%",
    alignSelf: "center",
  },
  textContent: {
    flex: 2,
    padding: 10,
  },
  cardtitle: {
    fontSize: 12,
    // marginTop: 5,
    fontWeight: "bold",
  },
  cardDescription: {
    fontSize: 12,
    color: "#444",
  },
  markerWrap: {
    alignItems: "center",
    justifyContent: "center",
    width: 50,
    height: 50,
  },
  marker: {
    width: 30,
    height: 30,
  },
  button: {
    alignItems: "center",
    marginTop: 5,
  },
  signIn: {
    width: "100%",
    padding: 5,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 3,
  },
  textSign: {
    fontSize: 14,
    fontWeight: "bold",
  },
  bubble: {
    flexDirection: "column",
    alignSelf: "flex-start",
    backgroundColor: "#fff",
    borderRadius: 6,
    borderColor: "#ccc",
    borderWidth: 0.5,
    padding: 15,
    width: 150,
  },
  name: {
    fontSize: 16,
    marginBottom: 5,
  },
  arrow: {
    backgroundColor: "transparent",
    borderColor: "transparent",
    borderTopColor: "#fff",
    borderWith: 16,
    alignSelf: "center",
    marginTop: -32,
  },
  arrowBorder: {
    backgroundColor: "transparent",
    borderColor: "transparent",
    borderTopColor: " #007A87",
    borderWith: 16,
    alignSelf: "center",
    marginTop: -0.5,
  },
  image: {
    width: 120,
    height: 80,
  },
  // container: {
  //   marginTop: 20,
  //   // marginBottom: 100,
  //   // flex: 1,
  //   backgroundColor: "#F8F8F8",
  //   alignItems: "center",
  //   justifyContent: "center",
  // },
  // map: {
  //   width: 340,
  //   height: 240,
  // },

  fullMap: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  // text: {
  //   marginTop: 10,
  //   marginBottom: 10,
  //   backgroundColor: "transparent",
  // },
});
