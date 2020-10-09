import React, { useState, Fragment } from 'react';
import { generatePath } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import styled from 'styled-components';
import { NetworkStatus } from '@apollo/client';

// Components.
import Head from 'components/Head';
import InfiniteScroll from 'components/InfiniteScroll';
import Post from 'components/Post/Post';
import Skeleton from 'components/Skeleton';
import { Loading } from 'components/Loading';

// GraphQL.
import { POSTS } from 'graphql/post';

// Store.
import { useStore } from 'store/store';

// Constants.
import { HOME_PAGE_POSTS_LIMIT } from 'constants/DataLimit';

// Routes.
import * as Routes from 'routes';

// Styled.
import Container from 'styled/Container';
import Spacing from 'styled/Spacing';

const Home = () => {
	const [{ auth }] = useStore();

	const variables = {
		first: HOME_PAGE_POSTS_LIMIT,
		offset: 0,
	};

	const { loading, data, fetchMore, networkStatus } = useQuery(POSTS, {
		variables,
	});

	return (
		<Container w='500px'>
			<Head />
			<Spacing top='20px' />
			{(() => {
				if (loading && networkStatus === NetworkStatus.loading) {
					return <Skeleton h='500px' count={HOME_PAGE_POSTS_LIMIT} />;
				}

				console.log('HERE', data);

				const { posts, hasMore } = data.posts;

				if (!posts.length) {
					return <p>No Post Found! Oops!</p>;
				}

				return (
					<InfiniteScroll
						data={posts}
						hasMore={hasMore}
						variables={variables}
						fetchMore={fetchMore}
					>
						{(data: any) => {
							const showNextLoading =
								loading && networkStatus === NetworkStatus.fetchMore && hasMore;
							return (
								<>
									{data.map((post: any) => (
										<Fragment key={post.id}>
											<Spacing bottom='15px'>
												<Post
													id={post.id}
													text={post.text}
													userId={post.user.id}
													username={post.user.username}
													createdAt={post.createdAt}
												/>
											</Spacing>
										</Fragment>
									))}
									{showNextLoading && <Loading top='lg' />}
								</>
							);
						}}
					</InfiniteScroll>
				);
			})()}
		</Container>
	);
};

export default Home;
